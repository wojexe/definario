<template>
  <div class="carousel__card" @click="openModal" ref="card">
    <span class="carousel__card__title">{{ definee }}</span>
    <p class="carousel__card__definitionShort">
      <ContentRenderer :content="definition" />
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useStore } from "../../store/index";

import anime from "animejs";

import ContentRenderer from "@/components/TheContentRenderer.vue";

export default defineComponent({
  name: "CarouselCard",
  props: {
    id: String,
    definee: String,
    definition: Array
  },
  components: {
    ContentRenderer
  },
  setup(props) {
    const card = ref();

    const store = useStore();

    function openModal() {
      if (!store.state.homepage.carousel.blockModal) {
        store.dispatch("openModal", props.id);
      }
    }

    const animation = {
      duration: 100,
      easing: "easeOutCirc"
    };

    function focusEnterAnimation() {
      anime({
        targets: card.value,
        duration: animation.duration,
        easing: animation.easing,
        scale: [1, 0.95]
      });
    }

    function leaveAnimation() {
      anime({
        targets: card.value,
        duration: animation.duration,
        easing: animation.easing,
        scale: [0.95, 1]
      });
    }

    onMounted(() => {
      (card.value as HTMLElement).addEventListener(
        "mouseenter",
        focusEnterAnimation
      );

      (card.value as HTMLElement).addEventListener(
        "mouseleave",
        leaveAnimation
      );
    });

    return {
      card,
      openModal
    };
  }
});
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.carousel {
  &__card {
    display: grid;
    grid-template-rows:
      min-content
      1fr;
    gap: 1ch;
    width: 100%;
    border-radius: var(--card__border-radius);
    padding: 1.5ch;

    background: white;
    color: var(--text-color__normal);

    text-align: center;

    box-sizing: border-box;

    overflow: hidden;
    text-overflow: ellipsis;

    cursor: pointer;
    user-select: none;
    cursor: pointer;

    transition: box-shadow 150ms ease-in-out;

    &__title {
      font-size: var(--text-size--MP);
      font-weight: bold;
      font-style: italic;
      line-height: 1.5ch;
      letter-spacing: -0.08ch;
      box-sizing: border-box;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    &__definitionShort {
      font-size: var(--text-size--S);
      box-sizing: border-box;
      height: 100%;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 6;
      padding-bottom: 0.8px;
      overflow: hidden;
    }

    &:focus-visible {
      box-shadow: inset 0 0 16px rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
