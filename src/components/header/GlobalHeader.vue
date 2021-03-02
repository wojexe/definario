<template>
  <header class="header" :class="offline ? 'offline' : ''">
    <span>Definario</span>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GlobalHeader",
  props: {
    backArrow: Boolean,
    offline: Boolean
  }
});
</script>

<style lang="scss" scoped>
.header {
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

  &::before {
    content: "TRYB OFFLINE";
    display: absolute;
    position: absolute;
    top: calc(60px + var(--sat) + 1ch);
    padding: 0.25ch 1ch;
    background: rgba(255, 0, 0, 1);
    box-shadow: 0 8px 32px rgba(255, 0, 0, 1);
    border-radius: 100px;
    z-index: 10000;
    opacity: 0;
    transition: opacity 200ms ease-in-out;
  }

  &.offline {
    &::before {
      opacity: 1;
    }
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
