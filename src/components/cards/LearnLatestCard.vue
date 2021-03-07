<template>
  <div class="card" @click="startFlashcards" tabindex="0">
    POWTARZAJ
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LearnCard",
  setup() {
    const startFlashcards = function() {
      console.log("startFlashcards");
    };

    return {
      startFlashcards
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

  height: 100%;
  padding: 2ch;

  text-decoration: none;
  cursor: pointer;
  color: black;
  background-color: rgb(var(--theme-color__card--background));
  border-radius: 35px;

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

    border-radius: 35px;
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
