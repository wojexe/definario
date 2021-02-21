<template>
  <Header :visible="headerIsVisible" :landing="headerIsLanding" />
  <slot />
  <NavigationBar :visible="navigationIsVisible" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/TheHeader.vue";
import NavigationBar from "@/components/TheNavigationBar.vue";

export default defineComponent({
  name: "Skeleton",
  components: {
    Header,
    NavigationBar
  },
  props: {
    headerIsVisible: Boolean,
    headerIsLanding: Boolean,
    navigationIsVisible: Boolean
  }
});
</script>

<style lang="scss">
main {
  display: grid;
  justify-self: center;
  grid-gap: 2rem;
  width: 100%;
  box-sizing: border-box;

  padding-top: max(calc(var(--sat) + calc(60px + 2rem)), calc(60px + 2rem));
  padding-right: max(calc(var(--sar) + 5%), 5%);
  padding-bottom: max(calc(var(--sab) + calc(60px + 2rem)), calc(60px + 2rem));
  padding-left: max(calc(var(--sal) + 5%), 5%);

  overflow-x: hidden;
  overflow-y: auto;
}
</style>
