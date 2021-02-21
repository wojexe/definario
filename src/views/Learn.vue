<template>
  <main>learn</main>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Home"
});
</script>

<style lang="scss" scoped>
main {
  background: red;
}
</style>
