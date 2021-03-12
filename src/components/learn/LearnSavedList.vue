<template>
  <div class="list-container" ref="wrapper">
    <div
      class="list-container__row"
      v-for="[sessionId, categories] in Object.entries(savedSessions)"
      :key="sessionId"
      :session-id="sessionId"
    >
      <ul class="list-container__row__item" @click="startSession(sessionId)">
        <li
          class="list-container__list__item"
          v-for="{ id, label } in categories"
          :key="id"
        >
          {{ label }}
        </li>
      </ul>
      <svg
        v-show="!isEmpty"
        class="list-container__row__delete-button"
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
    </div>
    <span v-if="isEmpty" class="list-container__row__empty">
      brak zapisanych kart
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from "vue";
import { useStore } from "@/store/index";
import { useRouter } from "vue-router";

import anime from "animejs";

export default defineComponent({
  name: "LearnItemList",
  props: {
    add: Boolean
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const wrapper = ref();
    const parent = ref();

    const customStyle = `--gradient: linear-gradient(99deg, rgba(255, 166, 0, 1) 14.7%, rgb(255, 133, 63) 73%); --shadow: rgba(255, 133, 63, 1)`;

    const savedSessions = computed(() => store.state.learn.savedSessions);

    const isEmpty = computed(
      () => Object.entries(savedSessions.value).length === 0
    );

    const deleteSession = function(e: PointerEvent) {
      console.log(e.target);
      const sId =
        (e.target as HTMLElement).parentElement?.getAttribute("session-id") ||
        (e.target as HTMLElement).parentElement?.parentElement?.getAttribute(
          "session-id"
        );
      store.dispatch("deleteLearningSession", sId);
    };

    const startSession = function(sessionId: string) {
      anime({
        targets: "main",
        duration: 250,
        easing: "easeInOutExpo",
        translateY: [0, 20],
        opacity: [1, 0],
        complete: () => {
          store.dispatch("startLearningSession", sessionId);
          router.push({ name: "Flashcards", params: { id: sessionId } });
        }
      });
    };

    onMounted(() => {
      if (!store.state.animated.learn.saved && !isEmpty.value) {
        anime.set(".list-container__row__delete-button", { opacity: 0 });
        anime({
          targets: (wrapper.value as HTMLElement).children,
          delay: anime.stagger(50, { start: 200 }),
          duration: 500,
          easing: "easeOutQuart",
          translateY: [100, 0],
          opacity: [0, 1],
          zIndex: [-100, 0],
          complete: () => {
            anime({
              targets: ".list-container__row__delete-button",
              delay: anime.stagger(50),
              duration: 200,
              easing: "easeOutQuart",
              translateX: [-50, 0],
              translateY: ["-50%", "-50%"],
              opacity: [0, 1],
              complete: () => store.commit("updateAnimatedLearnSaved")
            });
          }
        });
      }
    });

    return {
      customStyle,
      savedSessions,
      deleteSession,
      startSession,
      isEmpty,
      wrapper,
      parent
    };
  }
});
</script>

<style lang="scss" scoped>
.list-container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: clamp(
    14ch,
    calc(100vw - calc(calc(var(--sar) + var(--sab)) + 10ch)),
    36ch
  );

  &__row {
    position: relative;
    display: flex;
    justify-content: center;

    margin-bottom: 1rem;
    &:last-of-type {
      margin-bottom: 0;
    }

    &__delete-button {
      justify-self: center;
      right: -2ch;
      top: 50%;
      transform: translateY(-50%);
      position: absolute;
      height: 1.5ch;
      font-size: var(--text-size--XL);
      color: rgba(255, 255, 255, 1);
      filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
      border-radius: 100px;
      cursor: pointer;

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

    &__empty {
      text-align: center;
      font-style: italic;
      color: rgba(var(--text-color__normal), 0.5);
    }

    &__item {
      position: relative;

      // reset browser styles
      margin-block-start: 0;
      margin-block-end: 0;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      padding-inline-start: 0;

      align-self: center;
      min-width: 16ch;

      display: flex;
      flex-direction: column;
      align-items: flex-start;

      padding: 1ch 2ch;
      padding-left: 3.5ch;

      color: #fff;
      font-size: var(--text-size--S);
      font-weight: bold;
      background-image: var(--theme-gradient);
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

      // --- Shadows ---
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
        border-radius: var(--card__border-radius);
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
        border-radius: var(--card__border-radius);
      }
    }
  }
}
</style>
