<template>
  <div class="search__definition-list__element" tabindex="0" @click="openModal">
    <span class="search__definition-list__element__definee">
      {{ definee }}
    </span>
    <p class="search__definition-list__element__definition">
      <ContentRenderer :content="definition" />
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ContentRenderer from "@/components/TheContentRenderer.vue";

import { useStore } from "@/store/index";

export default defineComponent({
  name: "SearchCard",
  components: {
    ContentRenderer
  },
  props: {
    id: String,
    definee: String,
    definition: Array
  },
  setup(props) {
    const store = useStore();

    function openModal() {
      store.dispatch("openModal", props.id);
    }

    return {
      openModal
    };
  }
});
</script>

<style lang="scss" scoped>
.search {
  &__definition-list {
    &__element {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      max-width: 100%;
      margin-bottom: 2rem;
      padding: 2ch;
      box-sizing: border-box;
      border-radius: var(--card__border-radius);
      background: rgb(var(--theme-color__card--background));
      box-shadow: var(--theme-shadow__card);

      cursor: pointer;

      &__definee {
        font-size: var(--text-size--MP);
        font-weight: bold;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        -webkit-box-pack: end;
        overflow: hidden;
      }
      &__definition {
        font-size: var(--text-size--S);
        margin: 0;
        width: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 6;
        -webkit-box-pack: end;
        overflow: hidden;
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
          rgba(
            var(--theme-shadow__card__color),
            var(--theme-shadow__card__opacity)
          );
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
  }
}
</style>
