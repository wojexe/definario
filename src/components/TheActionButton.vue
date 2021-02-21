<template>
  <button class="button" :style="buttonStyle">
    <span v-if="content" class="button__content">
      {{ content }}
    </span>
    <svg
      v-if="arrow === true"
      class="button__arrow"
      :class="content != null ? 'button__arrow--content' : ''"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path
        fill-rule="evenodd"
        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ActionButton",
  props: {
    arrow: Boolean,
    content: String,
    color: String
  },
  computed: {
    buttonPadding() {
      let style = "padding: 0.25rem ";
      this.arrow && this.content == null
        ? (style += "3rem")
        : (style += "1.5rem");
      style += ";";
      return style;
    },
    buttonColor(): string {
      return this.color ? "--theme-color__primary: " + this.color + ";" : "";
    },
    buttonStyle(): string {
      return `${this.buttonPadding} ${this.buttonColor}`;
    }
  }
});
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5ch;

  position: relative;
  font-size: var(--text-size--M);
  height: 2.5rem;
  // padding: 0.25rem 3rem;

  border: none;
  border-radius: 100px;

  color: #fff;
  background: rgb(var(--theme-color__primary));

  &__arrow {
    height: 100%;
    fill: #fff;
    &--content {
      height: 80%;
    }
  }

  &__content {
    font-weight: 600;
  }

  // Shadows
  &,
  &::after,
  &::before {
    transition: 200ms all ease-in-out;
  }

  &::after {
    content: " ";
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border-radius: 100px;
    box-shadow: 0 16px 64px rgba(var(--theme-color__primary));
    opacity: 1;
  }
  &::before {
    content: " ";
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border-radius: 100px;
    box-shadow: 0 8px 42px rgba(var(--theme-color__primary));
    opacity: 0;
  }
  &:hover {
    transform: scale(1.05);
    &::after {
      opacity: 0;
    }
    &::before {
      opacity: 1;
    }
  }
  &:focus {
    box-shadow: 0 16px 64px rgba(var(--theme-color__secondary));
  }
}
</style>
