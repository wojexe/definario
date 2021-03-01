<template>
  <div class="overlay" @click="overlayClick">
    <div class="modal" ref="modal">
      <span class="modal__title">{{ definee }}</span>
      <div class="modal__content">
        <p class="modal__content__definition">{{ definition }}</p>
        <img
          v-show="image"
          :src="image"
          :alt="definee"
          class="modal__content__image"
        />
        <div
          class="modal__content__credits"
          v-if="definitionSource || imageSource"
        >
          <span
            class="modal__content__credits__definition"
            v-show="definitionSource"
            >Definicja: {{ definitionSource }}</span
          >
          <span class="modal__content__credits__image" v-show="imageSource">
            Zdjęcie: {{ imageSource }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useStore } from "../store/index";

import anime from "animejs";

export default defineComponent({
  name: "Modal",
  setup() {
    const store = useStore();

    const isVisible = computed(() => store.state.modal.visible);
    const definee = computed(() => store.state.modal.definee);
    const definition = computed(() => store.state.modal.definition);
    const definitionSource = computed(() => store.state.modal.definitionSource);
    const image = computed(() => store.state.modal.modalImage);
    const imageSource = computed(() => store.state.modal.modalImageSource);

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

    return {
      tl,
      isVisible,
      definee,
      definition,
      definitionSource,
      image,
      imageSource
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

    // width: calc(100% - 4ch);
    width: 100%;
    max-height: 80vh;
    padding: 2ch;
    padding-top: 1.5ch;

    box-sizing: border-box;

    z-index: 100;

    box-shadow: var(--theme-shadow__card);
    background: rgb(var(--theme-color__card--background));

    border-radius: 30px;

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
      color: rgb(var(--text-color__paragraph));
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
  }
  @media screen and (min-width: 768px) {
    .modal {
      width: clamp(10ch, 80%, 76ch);
    }
  }
}
</style>
