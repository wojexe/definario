<template>
  <div class="card" tabindex="0">
    <span class="card__text">POWTARZAJ</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LearnCard"
});
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  padding: 3ch 2ch;

  color: #fff;
  font-size: var(--text-size--XL);
  font-weight: bold;
  cursor: pointer;
  background-image: linear-gradient(
    99deg,
    rgba(255, 166, 0, 1) 14.7%,
    rgb(255, 133, 63) 73%
  );
  border-radius: var(--card__border-radius);

  text-decoration: none;

  // Shadows
  &::after,
  &::before,
  &:focus {
    transition: 200ms all ease-in-out;
    will-change: opacity;
  }

  &:hover {
    &::after {
      opacity: 0;
    }

    &::before {
      opacity: 0.8;
    }
  }

  &:focus-visible {
    &::after {
      opacity: 0;
    }

    &::before {
      opacity: 1;
    }
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    content: " ";
    width: 100%;
    height: 100%;
    box-shadow: 0 16px 26px rgba(255, 133, 63, 1);
    opacity: 0.3;
    border-radius: var(--card__border-radius);
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    content: " ";
    width: 100%;
    height: 100%;
    box-shadow: 0 8px 26px rgba(255, 133, 63, 1);
    opacity: 0;
    border-radius: var(--card__border-radius);
  }
}
</style>
