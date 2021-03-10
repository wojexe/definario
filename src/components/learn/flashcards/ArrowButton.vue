<template>
  <div
    class="flashcards__action-picker__arrow-button"
    :class="state === 1 ? 'flashcards__action-picker__arrow-button--next' : ''"
    ref="button"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="url(#gradient)"
      ref="arrow"
    >
      <path
        fill-rule="evenodd"
        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
      <defs>
        <radialGradient
          xmlns="http://www.w3.org/2000/svg"
          id="gradient"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0.728039 3.65177) rotate(51.0186) scale(22 24)"
        >
          <stop offset="0.02" stop-color="#3E85EE" />
          <stop offset="0.47" stop-color="#E389F0" />
          <stop offset="0.90" stop-color="#F3C07C" />
        </radialGradient>
      </defs>
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ArrowButton",
  props: {
    state: Number
  }
});
</script>

<style lang="scss">
.flashcards {
  &__action-picker {
    &__arrow-button {
      color: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100px;
      width: calc(var(--text-size--L) * 2.5);

      cursor: pointer;

      transition: 200ms ease-in-out all;

      &--next {
        border-radius: 20px 100px 100px 20px;
      }

      &:hover {
        transform: scale(1.1);
      }
      &:focus {
        transform: scale(1.1);
      }
    }
    svg {
      height: var(--text-size--L);
    }
  }
}
</style>
