<template>
  <section class="section">
    <span class="section__title" :style="titleMargin">{{ sectionTitle }}</span>
    <span class="section__subtitle" v-show="sectionSubtitle">{{
      sectionSubtitle
    }}</span>
    <slot v-bind="$props" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Section",
  props: {
    sectionTitle: String,
    sectionSubtitle: String
  },
  computed: {
    titleMargin(): string {
      return this.sectionSubtitle == null ? "margin-bottom: 0.75ch" : "";
    }
  }
});
</script>

<style lang="scss" scoped>
.section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  max-width: calc(
    100vw - calc(calc(var(--sar) + 5vw) + calc(var(--sal) + 5vw))
  );

  &__title {
    font-size: var(--text-size--L);
    font-weight: bold;
    text-transform: uppercase;

    text-shadow: 0 0 25px rgba(0, 0, 0, 0.25);
  }

  &__subtitle {
    color: rgb(var(--text-color__normal));
    font-size: var(--text-size--XS);
    font-style: italic;

    margin-top: -0.5ch;
    margin-bottom: calc(var(--text-size--L) * 0.75);
  }
}
</style>
