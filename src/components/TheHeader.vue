<template>
  <LandingPageHeader v-if="landing && visible" />
  <GlobalHeader v-else-if="visible" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LandingPageHeader from "@/components/header/LandingPageHeader.vue";
import GlobalHeader from "@/components/header/GlobalHeader.vue";

export default defineComponent({
  name: "Header",
  components: {
    LandingPageHeader,
    GlobalHeader
  },
  props: {
    visible: Boolean,
    landing: Boolean,
    backArrow: Boolean
  }
});
</script>

<style lang="scss">
header {
  pointer-events: none;
}
</style>
