<template>
  <main class="flashcards">
    <Definee definee="Granica ciągu" />
    <Definition
      image-alt="Granica ciągu - obraz"
      :definee="definee"
      :definition="definition"
      definition-source="matemaks.pl"
      image="/img/definitions/granica.png"
      image-source="matemaks.pl"
      v-if="flashcardState"
    />
    <ActionPicker @buttonClick="handleClick" />
  </main>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onBeforeUnmount,
  nextTick,
  ref,
  computed,
  watch
} from "vue";
import { useStore } from "../store/index";
import { useRouter } from "vue-router";

import anime from "animejs";

import Definee from "@/components/learn/flashcards/Definee.vue";
import Definition from "@/components/learn/flashcards/Definition.vue";
import ActionPicker from "@/components/learn/flashcards/ActionPicker.vue";

export default defineComponent({
  name: "Flashcards",
  components: {
    Definee,
    Definition,
    ActionPicker
  },
  setup() {
    const router = useRouter();

    const definition = `zbiór wszystkich punktów płaszczyzny, których odległość od ustalonego punktu na tej płaszczyźnie, nazywanego środkiem koła, jest mniejsza lub równa długości promienia koła.\n
          Równoważna definicja: część płaszczyzny ograniczona przez pewien okrąg; okrąg ten zawiera się w kole i jest zarazem jego brzegiem.`;

    const definitionRef = ref();

    const store = useStore();

    const flashcardState = computed(() => store.state.flashcards.current.state);

    const handleClick = function() {
      anime({
        targets: "main",
        duration: 300,
        translateY: [0, 20],
        opacity: [1, 0],
        easing: "easeOutExpo",
        complete: () =>
          store.commit("updateFlashcardState", flashcardState.value + 1)
      });
    };

    const slideUp = function() {
      anime({
        targets: "main",
        duration: 300,
        translateY: [20, 0],
        opacity: [0, 1],
        easing: "easeOutExpo"
      });
    };

    // Slideup after stateChange
    watch(flashcardState, async s => {
      console.log(`flashcardState: ${flashcardState.value}`);
      if (s === 2) {
        await console.log("fetch definitions");
        store.commit("updateFlashcardState", 0);
      }
      slideUp();
    });

    // Slideup animation on load
    onMounted(() =>
      nextTick(() => {
        slideUp();
      })
    );

    onBeforeUnmount(() => {
      console.log(router.currentRoute.value);
      store.dispatch("endLearningSession");
    });

    return {
      definition,
      definitionRef,
      flashcardState,
      handleClick
    };
  }
});
</script>

<style lang="scss" scoped>
.flashcards {
  display: grid;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  justify-items: center;
  align-items: center;
  align-self: center;

  padding-top: max(calc(var(--sat) + calc(60px + 2rem)), calc(60px + 2rem));
  padding-right: max(calc(var(--sar) + 5%), 5%);
  padding-bottom: max(calc(var(--sab) + 5%), 5%);
  padding-left: max(calc(var(--sal) + 5%), 5%);

  box-sizing: border-box;
}
</style>
