<template>
  <div class="wrapper">
    <ul class="item-list" ref="list" :style="customStyle">
      <li class="item-list__item" v-for="{ id, label } in selected" :key="id">
        {{ label }}
      </li>
    </ul>
    <svg
      class="save-button"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      tabindex="0"
      @click="saveSession"
    >
      <title>Zapisz</title>
      <path
        fill-rule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
        clip-rule="evenodd"
      />
    </svg>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useStore } from "@/store/index";

import anime from "animejs";
import { v4 as uuidv4 } from "uuid";

export default defineComponent({
  name: "LearnItemList",
  props: {
    selected: Array,
    add: Boolean
  },
  emits: ["savedSession"],
  setup(props, { emit }) {
    const store = useStore();

    const list = ref(null);

    const customStyle = `--gradient: linear-gradient(99deg, rgba(255, 166, 0, 1) 14.7%, rgb(255, 133, 63) 73%); --shadow: rgba(255, 133, 63, 1)`;

    // const selectedIds = computed(() => props.selected?.flatMap(x => x.id));
    const saveSession = function() {
      store.dispatch("saveLearningSession", {
        uuid: uuidv4(),
        arr: props.selected
      });

      emit("savedSession");
    };

    onMounted(() => {
      anime({
        targets: list.value,
        duration: 500,
        scaleY: [0, 1],
        easing: "easeInOutExpo"
      });
    });

    return {
      customStyle,
      saveSession,
      list
    };
  }
});
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  .save-button {
    right: -2ch;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    height: 1.5ch;
    font-size: var(--text-size--XL);
    color: rgba(255, 255, 255, 1);
    filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));

    will-change: transform filter;
    transition: 150ms all ease-in-out;
    &:hover {
      transform: translateY(-50%) scale(1.2);
      filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.8));
    }
    &:focus-visible {
      transform: translateY(-50%) scale(1.2);
      filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.8));
    }
    &:active {
      transform: translateY(-50%) scale(0.9);
    }
  }

  .item-list {
    // reset browser styles
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding: 1ch 2ch;
    padding-left: 3.5ch;

    color: #fff;
    font-size: var(--text-size--S);
    font-weight: bold;
    cursor: pointer;
    background-image: var(--gradient);
    border-radius: var(--card__border-radius);

    text-decoration: none;

    &__item {
      &::marker {
        color: rgba(255, 255, 255, 0.5);
      }

      &,
      &::marker {
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
      }
    }

    // Shadows
    &::after,
    &::before,
    &:focus {
      transition: 200ms all ease-in-out;
      will-change: opacity;
    }

    &:hover {
      &::after {
        opacity: 0;
      }

      &::before {
        opacity: 0.8;
      }
    }

    &:focus-visible {
      &::after {
        opacity: 0;
      }

      &::before {
        opacity: 1;
      }
    }

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      content: " ";
      width: 100%;
      height: 100%;
      box-shadow: 0 16px 26px var(--shadow);
      opacity: 0.3;
      border-radius: var(--card__border-radius);
    }

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      content: " ";
      width: 100%;
      height: 100%;
      box-shadow: 0 8px 26px var(--shadow);
      opacity: 0;
      border-radius: var(--card__border-radius);
    }
  }
}
</style>
