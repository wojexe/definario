<template>
  <div class="overlay" @click="overlayClick" v-once>
    <div class="modal" ref="modal">
      <span class="modal__title">{{ definee }}</span>
      <div class="modal__content">
        <p class="modal__content__definition">
          <ContentRenderer :content="definition" />
        </p>
        <div
          class="modal__content__credits"
          v-if="definitionSource || imageSource"
        >
          <span
            class="modal__content__credits__definition"
            v-show="definitionSource"
            >Definicja: {{ definitionSource }}</span
          >
        </div>
      </div>
      <div class="modal__save-button">
        <svg
          class="modal__save-button__icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          tabindex="0"
          @click="saveDefinition"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="modal__save-button__text">zapisano!</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useStore } from "../store/index";

import ContentRenderer from "@/components/TheContentRenderer.vue";

import anime from "animejs";

export default defineComponent({
  name: "Modal",
  components: {
    ContentRenderer
  },
  setup() {
    const store = useStore();

    const isVisible = computed(() => store.state.modal.visible);

    const definee = computed(() => store.state.modal.content.definee);
    const definition = computed(() => store.state.modal.content.definition);
    const definitionSource = computed(
      () => store.state.modal.content.definitionSource
    );

    // Animations (+ escape close)
    const tl = ref(
      anime.timeline({
        easing: "easeInOutExpo"
      })
    );

    onMounted(() => {
      tl.value
        .add({
          duration: 200,
          targets: ".overlay",
          opacity: [0, 1]
        })
        .add(
          {
            duration: 250,
            targets: ".modal",
            translateY: ["25%", "0%"],
            opacity: [0, 1],
            easing: "easeOutCirc"
          },
          0
        )
        .finished.then(() => {
          window.addEventListener("keyup", e => {
            if (e.key === "Esc" || e.key === "Escape") {
              tl.value.reverse();
              tl.value.play();
              tl.value.finished.then(() => store.dispatch("closeModal"));
            }
          });
        });
    });

    const saveDefinition = function() {
      store.dispatch("saveDefinition", store.state.modal.content.id).then(() =>
        anime({
          targets: ".modal__save-button__text",
          duration: 500,
          translateY: ["-2ch", "0ch"],
          opacity: [0, 0.75],
          easing: "easeOutQuart"
        }).finished.then(() => {
          anime({
            targets: ".modal__save-button__text",
            delay: 1000,
            duration: 500,
            translateY: ["0ch", "-2ch"],
            opacity: [0.75, 0],
            easing: "easeOutQuart"
          });
        })
      );
    };

    return {
      tl,
      isVisible,
      definee,
      definition,
      definitionSource,
      saveDefinition
    };
  },
  methods: {
    overlayClick(e: PointerEvent) {
      if (
        e.target !== this.$refs.modal &&
        !(this.$refs.modal as HTMLElement).contains(e.target as Node)
      ) {
        this.tl.reverse();
        this.tl.play();
        this.tl.finished.then(() => this.$store.dispatch("closeModal"));
      }
    }
  }
});
</script>

<style lang="scss">
.overlay {
  position: fixed;
  overflow-y: auto;
  top: 0;
  left: 0;

  height: 100vh;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;

  // transition: all ease-in-out 300ms;
  // opacity: 0;
  // &--visible {
  //   opacity: 1;
  // }

  .modal {
    display: flex;
    flex-direction: column;
    position: relative;

    // width: calc(100% - 4ch);
    width: 100%;
    max-height: 80vh;
    padding: 2ch;
    padding-top: 1.5ch;

    box-sizing: border-box;

    z-index: 200;

    box-shadow: var(--theme-shadow__card);
    background: rgb(var(--theme-color__card--background));

    border-radius: var(--card__border-radius);

    margin: var(--sat) var(--sar) var(--sab) var(--sal);

    // transition: all ease-in-out 300ms;
    // transform: translateY(25%);
    // &--visible {
    //   transform: translateY(0);
    // }

    &__title {
      display: flex;
      justify-content: center;
      position: relative;
      font-size: var(--text-size--L);
      font-weight: 600;
      margin-bottom: 1ch;
      // Dividers
      &::after,
      &::before {
        display: block;
        content: "";

        position: absolute;
        bottom: -0.6ch;
        transform: translateX(75%);

        width: calc(var(--text-size--MP) * 2);
        height: 0.2ch;

        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 20px;
      }
      &::before {
        transform: translateX(-75%);
      }
    }

    &__content {
      display: grid;
      flex-direction: column;
      align-items: center;
      gap: 2ch;
      grid-auto-columns: auto;
      height: min-content;
      padding-bottom: 0.2ch;
      overflow: auto;
      &__definition {
        margin: 0;
        font-size: var(--text-size--S);
      }
      &__image {
        width: clamp(26ch, 50%, 70vw);
        margin: auto;
        display: block;
        user-select: none;
        pointer-events: none;
      }
      &__credits {
        display: flex;
        width: 100%;
        justify-content: space-between;
        opacity: 0.5;
        font-size: var(--text-size--XS);
        flex-wrap: wrap;
      }
    }

    &__save-button {
      position: absolute;
      justify-self: center;
      align-self: center;
      bottom: 0;
      transform: translateY(calc(100% + 1ch));

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &__icon {
        height: var(--text-size--XL);
        color: white;
        cursor: pointer;
        filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
        z-index: 150;
        transition: 150ms all ease-in-out;
        opacity: 0.7;
        &:hover {
          opacity: 1;
          transform: scale(1.1);
          filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.6));
        }
        &:focus-visible {
          opacity: 1;
          transform: scale(1.1);
          filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.6));
        }
      }
      &__text {
        background: rgba(255, 255, 255, 1);
        color: black;
        padding: 0.5ch 1ch;
        margin-top: 0.5ch;
        opacity: 0;
        z-index: 125;
        pointer-events: none;
        user-select: none;
        border-radius: var(--pill__border-radius);
        box-shadow: var(--theme-shadow__card);
      }
    }
  }

  @media screen and (min-width: 768px) {
    .modal {
      width: clamp(10ch, 80%, 76ch);
    }
  }
}
</style>
