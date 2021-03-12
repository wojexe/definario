<template>
  <div class="flashcards__definee">{{ definee }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "FlashcardDefinee",
  props: {
    definee: String
  }
});
</script>

<style lang="scss">
.flashcards {
  &__definee {
    font-size: var(--text-size--L);
    font-weight: 600;
    padding: 0.5ch 2ch;

    color: var(--text-color__normal);
    background: rgb(var(--theme-color__card--background));

    box-shadow: var(--theme-shadow__card);
    border-radius: var(--pill__border-radius);
    @media screen and (min-width: 768px) {
      font-size: var(--text-size--XL);
    }
  }
}
</style>
