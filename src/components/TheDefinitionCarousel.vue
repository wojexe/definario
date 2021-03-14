<template>
  <div
    v-if="latestDefinitions.length"
    class="carousel"
    :style="getGridTemplateColumns"
  >
    <CarouselCard
      v-for="{ id, definee, definition } in latestDefinitions"
      :key="id"
      :id="id"
      :definee="definee"
      :definition="definition"
      tabindex="0"
    />
  </div>
  <span class="placeholder" v-else>
    tutaj pojawią się ostatnio otwarte definicje
  </span>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, nextTick, watch } from "vue";
import { useStore } from "../store/index";

import anime from "animejs";

import CarouselCard from "@/components/cards/CarouselCard.vue";
import { Card, Deck } from "types/definitions";

export default defineComponent({
  name: "DefinitionCarousel",
  components: {
    CarouselCard
  },
  setup() {
    const store = useStore();

    const latestDefinitions = computed(() => store.state.latest);

    const getGridTemplateColumns = computed(
      () =>
        `grid-template-columns: repeat(${latestDefinitions.value.length}, 18ch);`
    );

    function isTouchDevice() {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    }

    // Animate carousel on addition
    const detectChange = (a: Array<Card | Deck>, b: Array<Card | Deck>) =>
      a.length === b.length && a.every((v, i) => v.id === b[i].id);

    watch(
      () => latestDefinitions.value,
      (curr, prev) => {
        if (detectChange(curr, prev)) return;
        nextTick(() => {
          const carouselEl = document.getElementsByClassName("carousel")[0];
          const firstElement = carouselEl.children[0];
          anime.set(firstElement, { opacity: 0 });
          anime.set(carouselEl, { overflow: "visible" });
          console.log(isTouchDevice());
          anime
            .timeline({
              easing: "easeOutQuart",
              duration: 500
            })
            .add({
              targets: carouselEl,
              translateX: ["-22ch", "0ch"],
              complete: () => {
                anime.set(carouselEl, {
                  overflow: isTouchDevice() ? "auto" : "hidden"
                });
              }
            })
            .add(
              {
                targets: firstElement,
                duration: 100,
                easing: "easeOutCirc",
                opacity: [0, 1]
              },
              0
            );
        });
      }
    );

    // Swiping mechanism for desktop
    // Heavily inspired by https://htmldom.dev/drag-to-scroll/
    onMounted(() => {
      nextTick(() => {
        if (!store.state.animated.homepage.carousel)
          anime({
            targets: ".carousel__card",
            delay: anime.stagger(50, { start: 200 }),
            duration: 500,
            easing: "easeOutQuart",
            translateX: [100, 0],
            opacity: [0, 1],
            complete: () => store.commit("updateAnimatedHomepageCarousel")
          });

        const slider: HTMLElement | null = document.querySelector(".carousel");

        // Momentum
        let velX = 0;
        let momentumID: number;

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

    return { latestDefinitions, getGridTemplateColumns };
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
  border-radius: var(--card__border-radius);

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
