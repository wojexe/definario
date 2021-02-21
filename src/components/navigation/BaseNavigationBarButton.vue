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
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    &.router-link-active {
      color: rgba(255, 255, 255, 0.9);
    }
    transition: 100ms color ease-in-out;
  }
  svg {
    width: 1.9rem;
  }
}
</style>
