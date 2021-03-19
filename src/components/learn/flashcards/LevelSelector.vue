<template>
  <ul class="flashcards__action-picker__level-selector" ref="scrollContainer">
    <li
      class="flashcards__action-picker__level-selector__item"
      v-for="{ name, value } in availableOptions"
      :key="value"
      :value="`${value}`"
      :ref="setItemRef"
      @click="selectSelf"
      tabindex="0"
    >
      {{ name }}
    </li>
  </ul>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  Ref,
  onMounted,
  nextTick,
  watchEffect
} from "vue";

import { useStore } from "@/store/index";

export default defineComponent({
  name: "LevelSelector",
  setup() {
    const store = useStore();

    const scrollContainer = ref();
    const scrollItems: Ref<Array<HTMLElement>> = ref([]);

    const setItemRef = function(el: HTMLElement) {
      if (el) scrollItems.value.push(el);
    };

    const availableOptions = ref({
      0: { name: "Słabo", value: 0 },
      1: { name: "Średnio", value: 1 },
      2: { name: "Dobrze", value: 2 },
      3: { name: "Wyśmienicie", value: 3 }
    });

    const currentlySelected = ref(1);

    const selectSelf = function(e: PointerEvent) {
      (e.target as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

      currentlySelected.value = parseInt(
        (e.currentTarget as HTMLElement).getAttribute("value") ?? "0"
      );
    };

    onMounted(() => {
      // On selected change, update classes
      watchEffect(() => {
        for (const item of scrollItems.value)
          item.classList.remove(
            "flashcards__action-picker__level-selector__item--selected"
          );

        scrollItems.value[currentlySelected.value].classList.add(
          "flashcards__action-picker__level-selector__item--selected"
        );

        store.commit("updateCurrentUserChoice", currentlySelected.value);
      });

      nextTick(() => {
        scrollItems.value[currentlySelected.value].scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center"
        });

        const scrollContainerElement = scrollContainer.value as HTMLElement;
        scrollContainerElement.addEventListener(
          "wheel",
          e => {
            e.preventDefault();
          },
          { capture: true, passive: false }
        );
      });
    });

    return {
      scrollContainer,
      scrollItems,
      setItemRef,
      availableOptions,
      selectSelf
    };
  }
});
</script>

<style lang="scss">
.flashcards {
  &__action-picker {
    &__level-selector {
      all: unset;
      margin-right: 1ch;
      color: inherit;
      border-radius: 100px 25px 25px 100px;
      padding: 0 4ch;
      list-style-type: none;
      text-align: center;

      overflow: auto;
      overflow-x: hidden;

      scroll-snap-type: y mandatory;

      &::-webkit-scrollbar {
        width: 0;
      }
      -ms-overflow-style: none;
      scrollbar-width: none;

      &__item {
        font-weight: bold;
        scroll-snap-align: center;
        user-select: none;
        color: rgba(var(--text-color__normal), 0.5);
        font-size: var(--text-size--M);
        height: calc(var(--text-size--M) + 0.5ch);
        width: min-content;
        margin: auto;

        cursor: pointer;

        transition: 150ms ease-in-out all;

        &--selected {
          color: rgb(var(--text-color__normal));
        }
        &:hover {
          transform: scale(1.1);
        }
        &:focus-visible {
          transform: scale(1.1);
        }
        &:first-of-type {
          margin-top: 1.5ch;
        }
        &:last-of-type {
          margin-bottom: 1.5ch;
        }
      }
    }
  }
}
</style>
