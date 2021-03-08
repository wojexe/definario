<template>
  <main class="flashcards">
    <Definee definee="Granica ciągu" />
    <Definition
      v-if="1"
      :definition="definition"
      definition-source="matemaks.pl"
      image="/img/definitions/granica.png"
      image-source="matemaks.pl"
    />
    <ActionPicker />
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, nextTick } from "vue";
import { useStore } from "../store/index";

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
    onMounted(() =>
      nextTick(() => {
        anime({
          targets: "main",
          duration: 250,
          translateY: [20, 0],
          opacity: [0, 1],
          easing: "easeInOutExpo"
        });
      })
    );

    const store = useStore();

    const flashcardState = store.state.flashcards.state;

    const definition = `zbiór wszystkich punktów płaszczyzny, których odległość od ustalonego punktu na tej płaszczyźnie, nazywanego środkiem koła, jest mniejsza lub równa długości promienia koła.\n
          Równoważna definicja: część płaszczyzny ograniczona przez pewien okrąg; okrąg ten zawiera się w kole i jest zarazem jego brzegiem.`;
    return {
      definition,
      flashcardState
    };
  }
});
</script>

<style lang="scss" scoped>
.flashcards {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  justify-content: center;
  align-items: center;

  padding-top: max(calc(var(--sat) + calc(60px + 2rem)), calc(60px + 2rem));
  padding-right: max(calc(var(--sar) + 5%), 5%);
  padding-bottom: max(calc(var(--sab) + 5%), 5%);
  padding-left: max(calc(var(--sal) + 5%), 5%);

  box-sizing: border-box;
}
</style>
