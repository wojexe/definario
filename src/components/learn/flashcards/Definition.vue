<template>
  <div class="flashcards__definition">
    <div class="flashcards__definition__content">
      <p class="flashcards__definition__content__definition">
        <ContentRenderer :content="definition" />
      </p>
      <span
        class="flashcards__definition__content__credits"
        v-show="definitionSource"
        >Definicja: {{ definitionSource }}</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ContentRenderer from "@/components/TheContentRenderer.vue";

export default defineComponent({
  name: "FlashcardDefinition",
  props: {
    definee: String,
    definition: Array,
    definitionSource: String
  },
  components: {
    ContentRenderer
  }
});
</script>

<style lang="scss">
.flashcards {
  &__definition {
    display: flex;
    align-items: center;
    justify-content: center;

    width: var(--width);
    max-width: 100%;
    padding: 2ch 2ch;

    border-radius: var(--card__border-radius);

    box-shadow: var(--theme-shadow__card);
    background: rgb(var(--theme-color__card--background));

    overflow: auto;

    box-sizing: border-box;

    &__content {
      display: grid;
      flex-direction: column;
      align-items: center;
      gap: 2ch;
      max-height: 45vh;
      grid-auto-columns: auto;
      height: min-content;
      padding-bottom: 0.2ch;
      overflow: auto;
      &__definition {
        margin: 0;
        font-size: var(--text-size--S);
      }
      &__image {
        width: clamp(26ch, 50%, 70vw);
        box-sizing: border-box;
        margin: auto;
        display: block;
        user-select: none;
        pointer-events: none;
      }
      &__credits {
        display: flex;
        width: 100%;
        justify-content: space-between;
        opacity: 0.5;
        font-size: var(--text-size--XS);
        flex-wrap: wrap;
      }
    }
  }
}
</style>
