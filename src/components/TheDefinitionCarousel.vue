<template>
  <div class="carousel" :style="getGridTemplateColumns">
    <CarouselCard
      v-for="definitionId in definitionList"
      :key="definitionId"
      :definition-id="definitionId"
      tabindex="0"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, onMounted, nextTick } from "vue";
import { useStore } from "../store/index";
import CarouselCard from "@/components/cards/CarouselCard.vue";

export default defineComponent({
  name: "DefinitionCarousel",
  props: {
    definitionList: {
      type: Array as PropType<Array<string>>,
      required: true
    }
  },
  components: {
    CarouselCard
  },
  setup(props) {
    const store = useStore();

    const getGridTemplateColumns = computed(
      () =>
        `grid-template-columns: repeat(${props.definitionList.length}, 18ch);`
    );

    // Swiping mechanism for desktop
    // Heavily inspired by https://htmldom.dev/drag-to-scroll/
    onMounted(() => {
      nextTick(() => {
        const slider: HTMLElement | null = document.querySelector(".carousel");

        // Momentum
        let velX = 0;
        let momentumID: number;

        function isTouchDevice() {
          return (
            "ontouchstart" in window ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0
          );
        }

        function cancelMomentumTracking() {
          cancelAnimationFrame(momentumID);
        }

        function momentumLoop() {
          if (slider) slider.scrollLeft += velX * 2;
          velX *= 0.98;
          if (Math.abs(velX) > 0.5) {
            momentumID = requestAnimationFrame(momentumLoop);
          }
        }

        function beginMomentumTracking() {
          cancelMomentumTracking();
          momentumID = requestAnimationFrame(momentumLoop);
        }

        if (isTouchDevice()) {
          if (slider) slider.style.overflowX = "auto";
        } else {
          let isDown = false;
          let startX: number;
          let scrollLeft: number;

          slider?.addEventListener("mousedown", e => {
            isDown = true;
            slider?.classList.add("active");
            startX = e.pageX - slider?.offsetLeft;
            scrollLeft = slider?.scrollLeft;
            cancelMomentumTracking();
          });

          slider?.addEventListener("mouseleave", () => {
            isDown = false;
            slider?.classList.remove("active");
            setTimeout(() => store.dispatch("carouselStopBlocking"), 100);
          });

          slider?.addEventListener("mouseup", () => {
            isDown = false;
            slider?.classList.remove("active");
            setTimeout(() => store.dispatch("carouselStopBlocking"), 100);
            beginMomentumTracking();
          });

          slider?.addEventListener("mousemove", e => {
            if (!isDown) return;
            e.preventDefault();
            store.dispatch("carouselStartBlocking");
            const x = e.pageX - slider?.offsetLeft;
            const walk = (x - startX) * 1.2; //scroll-fast
            const prevScrollLeft = slider?.scrollLeft;
            if (slider) slider.scrollLeft = scrollLeft - walk;
            velX = slider?.scrollLeft - prevScrollLeft;
          });
        }
      });
    });

    return { getGridTemplateColumns };
  }
});
</script>

<style lang="scss">
.carousel {
  max-width: 100%;
  flex: 1 1 auto;
  display: grid;
  gap: 4ch;
  grid-template-rows: 20ch;
  word-break: break-word;
  overflow: hidden;
  border-radius: 30px;

  filter: drop-shadow(
    0 0 32px
      rgba(
        var(--theme-shadow__card__color),
        calc(var(--theme-shadow__card__opacity) * 1.5)
      )
  );

  a {
    display: flex;
    flex: 0;
  }
}
</style>
