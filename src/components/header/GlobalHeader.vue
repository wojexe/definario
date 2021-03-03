<template>
  <header class="header" :class="offline ? 'offline' : ''">
    <span class="header__definario">Definario</span>
    <div
      class="header__back"
      :class="backArrow ? 'header__back--visible' : ''"
      @click="router.back(1)"
    >
      <svg
        class="header__back__arrow"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          fill-rule="evenodd"
          d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
          clip-rule="evenodd"
        />
      </svg>
      <span class="header__back__text">Back</span>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "GlobalHeader",
  props: {
    backArrow: Boolean,
    offline: Boolean
  },
  setup() {
    const router = useRouter();
    return { router };
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

  &__definario {
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

  &__back {
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    left: 1ch;

    height: var(--text-size--L);

    mix-blend-mode: overlay;
    color: #000;

    font-size: var(--text-size--M);
    font-weight: 600;

    cursor: pointer;
    pointer-events: all;

    z-index: 20;

    will-change: transform;
    transition: 200ms ease-in-out all;

    transform: translateX(-75%);
    opacity: 0;

    &__arrow {
      fill: black;
      height: 100%;
      margin-right: 1ch;
    }

    &__text {
      opacity: 1;
      transition: 200ms ease-in-out opacity;
      will-change: opacity;
    }

    &--visible {
      transform: translateX(0);
      opacity: 1;
    }
  }
}

@media screen and (min-width: 768px) {
  .header {
    &__back {
      &__text {
        opacity: 0;
      }
    }
  }
}
</style>
