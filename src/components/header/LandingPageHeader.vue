<template>
  <header class="header">
    <span class="header__title">Definario</span>
    <span class="header__subtitle">twoja encyklopedia</span>
    <img src="@/assets/landing.svg" />
    <img src="@/assets/landing.svg" />
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LandingPageHeader"
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  position: fixed;

  top: 0;
  height: 100%;
  max-height: 35vh;
  padding: 0 2ch;

  flex-direction: column;
  align-items: flex-start;

  letter-spacing: -0.15vmax;

  z-index: 50;
  img {
    position: absolute;
    top: 0;
    left: 0;

    height: 100%;
    max-height: 25vmax;

    z-index: 10;
    pointer-events: none;
    &:nth-of-type(2) {
      filter: blur(50px);
      z-index: 5;
    }
  }

  &__title,
  &__subtitle {
    top: 7.5vh;
    z-index: 20;
    color: black;
    mix-blend-mode: overlay;
  }

  &__title {
    position: relative;
    font-size: clamp(1px, 4.5vmax, 6vh);
    font-weight: bold;
  }

  &__subtitle {
    position: relative;
    font-size: clamp(1px, 3vmax, 5vh);
    font-style: italic;
    font-weight: bold;
    line-height: 0.75ch;
  }
}
</style>
