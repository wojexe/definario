<template>
  <teleport to="#app">
    <div class="overlay" @click="overlayClick">
      <div
        class="modal"
        :class="modalVisible ? 'modal--visible' : ''"
        ref="modal"
      >
        <span class="modal__title">{{ modalTitle }}</span>
        <div class="modal__content">
          <p class="modal__content__definition">{{ modalDefinition }}</p>
          <img
            v-show="modalImage"
            :src="imageSource"
            :alt="modalTitle"
            class="modal__content__image"
          />
          <div class="modal__content__credits">
            <span class="modal__content__credits__definition"
              >Definicja: {{ modalDefinitionSource }}</span
            >
            <span class="modal__content__credits__image"
              >Zdjęcie: {{ modalImageSource }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import anime from "animejs";

export default defineComponent({
  name: "Modal",
  props: {
    modalVisible: {
      required: true,
      type: Boolean
    },
    modalTitle: {
      required: true,
      type: String
    },
    modalDefinition: {
      required: true,
      type: String
    },
    modalDefinitionSource: {
      required: false,
      type: String
    },
    modalImage: {
      required: false,
      type: String
    },
    modalImageSource: {
      required: false,
      type: String
    }
  },
  setup() {
    const tl = ref(
      anime.timeline({
        easing: "easeInOutExpo"
      })
    );

    onMounted(() => {
      document.body.setAttribute("modal-open", "");
      tl.value
        .add({
          duration: 300,
          targets: ".overlay",
          opacity: [0, 1]
        })
        .add(
          {
            duration: 300,
            targets: ".modal",
            translateY: ["25%", "0%"],
            opacity: [0, 1],
            easing: "easeOutCirc"
          },
          0
        );
    });

    return { tl };
  },
  emits: ["closeModal"],
  computed: {
    imageSource(): NodeRequire {
      return require(`@/assets/${this.modalImage}`);
    }
  },
  methods: {
    async overlayClick(e: PointerEvent) {
      if (
        e.target !== this.$refs.modal &&
        !(this.$refs.modal as HTMLElement).contains(e.target as Node)
      ) {
        this.tl.reverse();
        this.tl.play();
        this.tl.finished.then(() => {
          document.body.removeAttribute("modal-open");
          this.$emit("closeModal");
        });
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
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2ch;
      padding-bottom: 0.2ch;
      overflow: auto;
      color: rgb(var(--text-color__paragraph));
      &__definition {
        margin: 0;
        font-size: var(--text-size--S);
      }
      &__image {
        width: clamp(26ch, 50%, 70vw);
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
