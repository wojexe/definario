<template>
  <div class="flashcards__action-picker">
    <ArrowButton />
    <LevelSelector />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ArrowButton from "@/components/learn/flashcards/ArrowButton.vue";
import LevelSelector from "@/components/learn/flashcards/LevelSelector.vue";

export default defineComponent({
  name: "",
  components: {
    ArrowButton,
    LevelSelector
  }
});
</script>

<style lang="scss">
.flashcards {
  &__action-picker {
    display: flex;
    flex-direction: row;
    gap: 4ch;
    background: aquamarine;
    & > * {
      background: blue;
    }
  }
}
</style>
