<template>
  <div class="flashcards__action-picker">
    <LevelSelector v-if="flashcardState === 1" />
    <ArrowButton :state="flashcardState" @click="emitClick" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { throttle } from "@martinstark/throttle-ts";

import ArrowButton from "@/components/learn/flashcards/ArrowButton.vue";
import LevelSelector from "@/components/learn/flashcards/LevelSelector.vue";

export default defineComponent({
  name: "FlashcardActionPicker",
  components: {
    ArrowButton,
    LevelSelector
  },
  props: {
    flashcardState: Number
  },
  emits: ["buttonClick"],
  setup(_, { emit }) {
    const [emitClick] = throttle(() => emit("buttonClick"), 200);

    return {
      emitClick
    };
  }
});
</script>

<style lang="scss">
.flashcards {
  &__action-picker {
    display: flex;
    flex-direction: row;
    color: white;
    & > * {
      grid-area: a;
      color: rgb(var(--text-color__normal));
      background: rgb(var(--theme-color__card--background));
      box-shadow: var(--theme-shadow__card);

      height: calc(var(--text-size--L) * 2.5);
    }
  }
}
</style>
