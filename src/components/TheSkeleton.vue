<template>
  <Header
    :visible="headerIsVisible"
    :landing="headerIsLanding"
    :offline="headerIsOffline"
    :back-arrow="headerBackArrow"
  />
  <slot />
  <NavigationBar :visible="navigationIsVisible" />
  <teleport to="#app">
    <Modal v-if="modalVisible" />
  </teleport>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "../store/index";

import Header from "@/components/TheHeader.vue";
import NavigationBar from "@/components/TheNavigationBar.vue";

import Modal from "@/components/TheModal.vue";

export default defineComponent({
  name: "Skeleton",
  components: {
    Header,
    NavigationBar,
    Modal
  },
  props: {
    headerIsVisible: Boolean,
    headerIsLanding: Boolean,
    headerIsOffline: Boolean,
    headerBackArrow: Boolean,
    navigationIsVisible: Boolean
  },
  setup() {
    const store = useStore();

    const modalVisible = computed(() => store.state.modal.visible);

    return { modalVisible };
  }
});
</script>

<style lang="scss">
main {
  display: grid;
  justify-self: center;
  grid-gap: 2rem;
  width: 100%;
  box-sizing: content-box;

  align-content: flex-start;
  justify-content: center;

  padding-top: max(calc(var(--sat) + calc(60px + 2rem)), calc(60px + 2rem));
  padding-right: max(calc(var(--sar) + 5%), 5%);
  padding-bottom: max(calc(var(--sab) + calc(60px + 3rem)), calc(60px + 3rem));
  padding-left: max(calc(var(--sal) + 5%), 5%);

  overflow-x: hidden;
  overflow-y: auto;
}
</style>
