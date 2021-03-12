<template>
  <div class="search__searchbar-wrapper" @click="focusInput">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      class="search__searchbar-wrapper__search search__searchbar-wrapper__search--disabled"
    >
      <path
        fill-rule="evenodd"
        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
        clip-rule="evenodd"
      />
    </svg>
    <input
      class="search__searchbar-wrapper__searchbar"
      type="text"
      ref="input"
      placeholder="wyszukaj"
      :value="phrase"
      @input="$emit('update:phrase', $event.target.value)"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      class="search__searchbar-wrapper__delete"
      :class="phrase ? '' : 'search__searchbar-wrapper__delete--disabled'"
      @click="clearInput"
    >
      <path
        fill-rule="evenodd"
        d="M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 2.414a1 1 0 00-1.414 1.414L10.586 10l-1.293 1.293a1 1 0 101.414 1.414L12 11.414l1.293 1.293a1 1 0 001.414-1.414L13.414 10l1.293-1.293a1 1 0 00-1.414-1.414L12 8.586l-1.293-1.293z"
        clip-rule="evenodd"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SearchBar",
  props: {
    phrase: String
  },
  emits: ["update:phrase"],
  setup(_, { emit }) {
    const input = ref();
    const clearInput = function() {
      emit("update:phrase", "");
      setTimeout(() => (input.value as HTMLInputElement).blur(), 10);
    };

    const focusInput = function() {
      (input.value as HTMLInputElement).focus();
    };

    return {
      input,
      clearInput,
      focusInput
    };
  }
});
</script>

<style lang="scss" scoped>
.search {
  &__searchbar-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    font-size: var(--text-size--M);
    background: rgb(var(--theme-color__card--background));
    padding: 0 1.5ch;
    min-height: 4ch;
    box-sizing: border-box;
    border-radius: var(--pill__border-radius);

    &__search,
    &__delete {
      display: block;
      color: rgba(var(--text-color__normal), 1);
      height: var(--text-size--XL);
      width: var(--text-size--XL);
      transition: 100ms ease-in-out all;
      &--disabled {
        color: rgba(var(--text-color__normal), 0.5);
      }
    }

    &__delete:hover {
      transform: scale(1.2);
    }

    &__searchbar {
      width: 100%;
      border: none;
      margin: 0 1ch;
    }

    &::before,
    &::after {
      position: absolute;
      left: 0;
      top: 0;
      display: block;
      content: "";
      width: 100%;
      height: 100%;
      border-radius: 100px;
      z-index: -1;
      transition: 150ms ease-in-out all;
    }

    &::before {
      box-shadow: var(--theme-shadow__card__x) 8px 36px
        rgba(
          var(--theme-shadow__card__color),
          var(--theme-shadow__card__opacity)
        );
      opacity: 1;
    }

    &::after {
      box-shadow: var(--theme-shadow__card__x) 4px 36px
        rgba(
          var(--theme-shadow__card__color),
          calc(var(--theme-shadow__card__opacity) * 3)
        );
      opacity: 0;
    }

    &:focus-within {
      &::before {
        opacity: 0;
      }
      &::after {
        opacity: 1;
      }
    }
    &:hover {
      &::before {
        opacity: 0;
      }
      &::after {
        opacity: 1;
      }
    }
  }
}
</style>
