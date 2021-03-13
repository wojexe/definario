<template>
  <div class="progress">
    <div
      class="progress__item"
      v-for="{ id, title, percentage } in categories"
      :key="id"
    >
      <span class="progress__item__title">{{ title }}</span>
      <span class="progress__item__percentage">{{ percentage }}%</span>
      <div
        class="progress__item__bar"
        :style="`--percentage: ${percentage}%`"
      ></div>
    </div>
    <span v-if="!categories" class="placeholder">brak zapisanych postępów</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CategoryProgress",
  props: {
    categories: Array
  },
  setup() {
    return {};
  }
});
</script>

<style lang="scss">
.progress {
  display: grid;
  align-items: center;
  text-align: center;
  gap: 1rem;
  width: var(--width);
  &__item {
    display: grid;
    grid-template-areas:
      "left right"
      "progress progress";
    font-weight: bold;
    font-size: calc(var(--text-size--MP) * 0.9);
    &__title {
      grid-area: left;
      justify-self: flex-start;
      text-transform: uppercase;

      text-shadow: 0 0 25px rgba(0, 0, 0, 0.25);
    }
    &__percentage {
      grid-area: right;
      justify-self: flex-end;
      text-shadow: 0 0 25px rgba(0, 0, 0, 0.25);
    }
    &__bar {
      background: #fff;
      grid-area: progress;
      height: 2ch;
      border-radius: var(--pill__border-radius);
      box-shadow: var(--theme-shadow__card);
      overflow: hidden;
      position: relative;
      &::after {
        position: absolute;
        display: block;
        content: "";
        height: 100%;
        width: var(--percentage);
        background: linear-gradient(150deg, #227e22 10%, #a8fb3c 90%);
        border-radius: var(--pill__border-radius);
        box-shadow: var(--theme-shadow__card);
      }
    }
  }
}
</style>
