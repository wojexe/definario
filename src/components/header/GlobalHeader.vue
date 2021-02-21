<template>
  <header>
    <span>Definario</span>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LandingPageHeader",
  props: {
    backArrow: Boolean
  }
});
</script>

<style lang="scss" scoped>
header {
  display: flex;
  position: fixed;

  top: 0;
  width: 100%;
  height: 60px;
  padding-top: var(--sat);

  flex-direction: column;
  align-items: center;
  justify-content: center;

  letter-spacing: -0.05ch;

  background: var(--theme-gradient);

  z-index: 50;

  &::after {
    content: " ";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    background: var(--theme-gradient);
    filter: blur(25px);
    opacity: 1;
    z-index: 5;
  }

  span {
    z-index: 20;
    color: var(--theme-gradient);
    mix-blend-mode: overlay;
    font-size: var(--text-size--L);
    font-weight: 600;
    z-index: 20;

    position: relative;
    &::after {
      content: "Definario";
      display: block;
      position: absolute;
      top: 0;
      z-index: 5;
    }
  }
}
</style>
