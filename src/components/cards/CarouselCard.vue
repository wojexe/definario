<template>
  <div class="carousel__card" @click="openModal">
    <span class="carousel__card__title">{{ definee }}</span>
    <p class="carousel__card__definitionShort">
      {{ definition }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "../../store/index";

export default defineComponent({
  name: "CarouselCard",
  props: {
    definitionId: {
      required: true,
      type: String
    }
  },
  setup(props) {
    const store = useStore();

    const definee = ref(`definee no. ${props.definitionId}`);
    const definition = ref(`definition no. ${props.definitionId}`);

    function openModal() {
      if (!store.state.homepage.carousel.blockModal) {
        store.dispatch("openModal", props.definitionId);
      }
    }

    /*  Now using -webkit-line-clamp ❤️
      Calculate abbreviation
      const definitionAbbr = ref(``);
      const calculateAbbr = function(maxCharacters: number) {
        definitionAbbr.value = "";
        let wordsToProvide = 0;
        for (let i = 0; i < maxCharacters; i++) {
          if (definition.value.split("")[i] === " ") wordsToProvide += 1;
        }
        for (const w in definition.value.split(" ")) {
          definitionAbbr.value += definition.value.split(" ")[w] + " ";
          if (wordsToProvide === 0) break;
          wordsToProvide -= 1;
        }
        definitionAbbr.value = definitionAbbr.value.substr(
          0,
          definitionAbbr.value.length - 1
        );
        definitionAbbr.value += "...";
      };
      const textSizeQuery = window.matchMedia(
        "(min-width: 350px) and (min-height: 650px)"
      );
      textSizeQuery.matches ? calculateAbbr(70) : calculateAbbr(110);
      textSizeQuery.addEventListener("change", e => {
        e.matches ? calculateAbbr(70) : calculateAbbr(110);
      })
    */

    return {
      definee,
      definition,
      openModal
    };
  }
});
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.carousel {
  &__card {
    display: grid;
    grid-template-rows:
      min-content
      1fr;
    gap: 1ch;
    width: 100%;
    border-radius: var(--card__border-radius);
    padding: 1.5ch;

    background: white;
    color: var(--text-color__normal);

    text-align: center;

    box-sizing: border-box;

    overflow: hidden;
    text-overflow: ellipsis;

    cursor: pointer;
    user-select: none;
    cursor: pointer;

    &__title {
      font-size: var(--text-size--L);
      font-weight: bold;
      font-style: italic;
      line-height: 1.5ch;
      letter-spacing: -0.08ch;
      box-sizing: border-box;
    }

    &__definitionShort {
      font-size: var(--text-size--S);
      box-sizing: border-box;
      height: 100%;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 6;
      padding-bottom: 0.8px;
      overflow: hidden;
    }

    &:focus-visible {
      box-shadow: inset 0 0 16px rgba(0, 0, 0, 0.4);
    }

    &:hover {
      transform: scale(0.95);
    }
  }
}
</style>
