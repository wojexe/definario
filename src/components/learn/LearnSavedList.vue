<template>
  <div class="wrapper" ref="wrapper">
    <ul
      class="item-list"
      v-for="{ sessionId, children } in savedSessions"
      :key="sessionId"
    >
      <li class="item-list__item" v-for="item in children" :key="item">
        {{ item }}
      </li>
      <svg
        class="delete-button"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        tabindex="0"
        @click="deleteSession"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
          clip-rule="evenodd"
        />
      </svg>
    </ul>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useStore } from "../../store/index";

import anime from "animejs";

export default defineComponent({
  name: "LearnItemList",
  props: {
    savedSessions: Array,
    add: Boolean
  },
  setup() {
    const store = useStore();

    const wrapper = ref(null);

    const customStyle = `--gradient: linear-gradient(99deg, rgba(255, 166, 0, 1) 14.7%, rgb(255, 133, 63) 73%); --shadow: rgba(255, 133, 63, 1)`;

    const saveSession = function() {
      console.log("saveSession");
    };

    onMounted(() => {
      if (!store.state.animated.saved)
        anime({
          targets: wrapper.value.children,
          delay: anime.stagger(50, { start: 200 }),
          duration: 500,
          easing: "easeOutQuart",
          translateY: [100, 0],
          opacity: [0, 1],
          complete: () => store.commit("updateAnimatedSaved")
        });
    });

    return {
      customStyle,
      saveSession,
      wrapper
    };
  }
});
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  width: clamp(
    14ch,
    calc(100vw - calc(calc(var(--sar) + var(--sab)) + 10ch)),
    36ch
  );
  .delete-button {
    justify-self: center;
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
      filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.6));
    }
    &:focus-visible {
      transform: translateY(-50%) scale(1.2);
      filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.6));
    }
    &:active {
      transform: translateY(-50%) scale(0.9);
    }
  }

  .item-list {
    position: relative;

    // reset browser styles
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0;

    margin-bottom: 1rem;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding: 1ch 2ch;
    padding-left: 3.5ch;

    color: #fff;
    font-size: var(--text-size--S);
    font-weight: bold;
    cursor: pointer;
    background-image: var(--theme-gradient);
    border-radius: 35px;

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
      box-shadow: 0 16px 26px rgba(var(--theme-shadow__card__color), 0.2);
      opacity: 0.3;
      border-radius: 35px;
    }

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      content: " ";
      width: 100%;
      height: 100%;
      box-shadow: 0 8px 26px rgba(var(--theme-shadow__card__color), 0.3);
      opacity: 0;
      border-radius: 35px;
    }
  }
}
</style>
