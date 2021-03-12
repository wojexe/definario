<template>
  <div class="card" @click="openModal" tabindex="0">
    <span class="card__header">
      {{ definee }}
    </span>
    <p class="card__content">
      <ContentRenderer :content="definition" />
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, computed } from "vue";
import { useStore } from "../../store/index";

import ContentRenderer from "@/components/TheContentRenderer.vue";

export default defineComponent({
  name: "HomeCard",
  props: {
    definitionId: {
      required: true,
      type: String
    }
  },
  components: {
    ContentRenderer
  },
  setup(props) {
    const store = useStore();

    store.dispatch("featuredUpdate", props.definitionId);
    const definee = computed(
      () => store.state.homepage.featured.content.definee
    );
    const definition = computed(
      () => store.state.homepage.featured.content.definition
    );

    const modalVisible = ref(false);

    function openModal() {
      modalVisible.value = true;
      store.dispatch("openModal", props.definitionId);
    }

    watchEffect(() => {
      if (!store.state.modal.visible)
        modalVisible.value = store.state.modal.visible;
    });

    return {
      definee,
      definition,
      openModal,
      modalVisible
    };
  }
});
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  padding: 2ch;
  padding-top: 1.5ch;

  width: var(--width);

  box-sizing: border-box;

  text-decoration: none;
  cursor: pointer;
  color: black;
  background-color: rgb(var(--theme-color__card--background));
  border-radius: var(--card__border-radius);
  &__header {
    display: flex;
    justify-content: center;
    position: relative;
    font-size: var(--text-size--MP);
    font-weight: 600;
    margin-bottom: 1.4ch;
    &::after,
    &::before {
      display: block;
      content: "";

      position: absolute;
      bottom: -0.85ch;
      transform: translateX(75%);

      width: calc(var(--text-size--MP) * 2);
      height: 0.3ch;

      background-color: rgba(0, 0, 0, 0.2);
      border-radius: var(--pill__border-radius);
    }
    &::before {
      transform: translateX(-75%);
    }
  }
  &__content {
    font-size: var(--text-size--S);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 10;
    padding-bottom: 0.8px;
    overflow: hidden;
  }
  p {
    margin: 0;
  }

  // Shadows
  &::after,
  &::before,
  &:focus {
    transition: 200ms all ease-in-out;
    will-change: opacity;
  }

  &::after,
  &::before {
    content: "";

    top: 0;
    right: 0;
    position: absolute;

    width: 100%;
    height: 100%;

    border-radius: var(--card__border-radius);
  }

  &::after {
    box-shadow: 0 16px 64px
      rgba(var(--theme-shadow__card__color), var(--theme-shadow__card__opacity));
    opacity: 1;
  }

  &::before {
    box-shadow: 0 8px 42px
      rgba(
        var(--theme-shadow__card__color),
        calc(var(--theme-shadow__card__opacity) * 2)
      );
    opacity: 0;
  }

  &:hover {
    &::after {
      opacity: 0;
    }

    &::before {
      opacity: 1;
    }
  }

  &:focus-visible {
    &::after,
    &::before {
      opacity: 0;
    }
    box-shadow: 0 16px 64px
      rgba(
        var(--theme-shadow__card__color),
        calc(var(--theme-shadow__card__opacity) * 3)
      );
  }
}
</style>
