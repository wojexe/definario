<template>
  <div class="flashcards__action-picker">
    <LevelSelector v-if="flashcardState === 1" />
    <ArrowButton :state="flashcardState" @click="emitClick" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "../../../store/index";

import ArrowButton from "@/components/learn/flashcards/ArrowButton.vue";
import LevelSelector from "@/components/learn/flashcards/LevelSelector.vue";

export default defineComponent({
  name: "FlashcardActionPicker",
  components: {
    ArrowButton,
    LevelSelector
  },
  emits: ["buttonClick"],
  setup(_, { emit }) {
    const store = useStore();

    const flashcardState = computed(() => store.state.flashcards.state);

    const emitClick = function() {
      emit("buttonClick");
    };

    return {
      emitClick,
      flashcardState
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
