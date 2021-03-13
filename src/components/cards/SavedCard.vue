<template>
  <div class="saved__section__row__content" tabindex="0" @click="openModal">
    <span class="saved__section__row__content__definee">
      {{ definee }}
    </span>
    <p class="saved__section__row__content__definition">
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

    const getComponentType = function(s: string) {
      if (s === "string") return "span";
      else return "img";
    };
    const getSourcePath = function(s: string) {
      return `/img/definitions/${s}`;
    };

    return {
      getComponentType,
      getSourcePath,
      openModal
    };
  }
});
</script>

<style lang="scss" scoped>
.saved {
  &__section {
    &__row {
      &__content {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        padding: 2ch;
        box-sizing: border-box;
        border-radius: var(--card__border-radius);
        background: rgb(var(--theme-color__card--background));
        box-shadow: var(--theme-shadow__card);

        cursor: pointer;

        &__definee {
          font-size: var(--text-size--MP);
          font-weight: bold;
        }
        &__definition {
          font-size: var(--text-size--S);
          margin: 0;
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
}
</style>
