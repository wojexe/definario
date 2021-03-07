<template>
  <router-link :to="normalizedDestination">
    <slot />
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavigationButton",
  props: {
    destination: {
      type: String,
      required: true
    }
  },
  computed: {
    normalizedDestination(): string {
      return this.destination.toLowerCase();
    }
  }
});
</script>

<style lang="scss">
nav {
  a {
    position: relative;

    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    &.router-link-active {
      color: rgba(255, 255, 255, 0.9);
    }
    transition: 100ms color ease-in-out;

    &:focus-visible {
      &::after {
        opacity: 1;
      }
    }

    &:after {
      position: absolute;
      content: "";
      display: block;
      bottom: -2px;
      height: 0.25ch;
      width: 100%;
      background-color: rgba(255, 255, 255, 0.9);
      border-radius: 100px;
      opacity: 0;

      will-change: opacity;
      transition: 100ms ease-in-out opacity;
    }
  }
  svg {
    width: 1.9rem;
  }
}
</style>
