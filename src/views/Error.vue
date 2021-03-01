<template>
  <main>
    <span class="error__title">ERROR</span>
    <span class="error__subtitle">NIE ZNALEZIONO STRONY</span>
    <Button
      :arrow="false"
      content="WRÓĆ"
      color="255,0,0"
      :href="href"
      @click="$router.back()"
    />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/TheActionButton.vue";

export default defineComponent({
  name: "Error",
  components: {
    Button
  }
});
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;

  height: 100vh;
  margin: 0;
  gap: 0;

  box-sizing: border-box;

  justify-content: center;
  align-items: center;
  text-align: center;

  .error {
    &__title {
      font-size: var(--text-size--XXL);
      font-weight: bold;
      line-height: 1ch;
    }

    &__subtitle {
      font-size: var(--text-size--M);
      font-weight: bold;
      font-style: italic;
      margin-bottom: 2ch;
    }
  }
}
</style>
