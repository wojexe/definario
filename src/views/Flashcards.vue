<template>
  <main class="flashcards" v-if="!allCardsDisplayed">
    <Definee :definee="definee" />
    <Definition
      :definee="definee"
      :definition="definition"
      :definition-source="definitionSource"
      v-if="flashcardState"
    />
    <ActionPicker
      :flashcard-state="flashcardState"
      @buttonClick="handleClick"
    />
  </main>
  <main class="flashcards" v-else>
    <span class="placeholder">to wszystkie karty na dziś</span>
  </main>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  nextTick,
  computed,
  ref,
  watch
} from "vue";
import { useStore } from "../store/index";
import { useRouter } from "vue-router";

import { Card } from "@/../types/definitions";

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
    const store = useStore();
    const router = useRouter();

    const definee = computed(() => store.state.flashcard.definee);
    const definition = computed(() => store.state.flashcard.definition);
    const definitionSource = computed(
      () => store.state.flashcard.definitionSource
    );

    const flashcardState = computed(() => store.state.flashcard.state);

    const slideUp = function() {
      anime({
        targets: "main",
        duration: 300,
        translateY: [20, 0],
        opacity: [0, 1],
        easing: "easeOutExpo"
      });
    };

    const sessionId = ref("");
    const currentSession = computed(
      () => store.state.learn.savedSessions[sessionId.value]
    );

    const allCardsDisplayed = computed(
      () => currentSession.value.queue.length === 0
    );

    onBeforeMount(() => {
      // Read sessionId from the URL
      sessionId.value = router.currentRoute.value.params.id as string;

      console.log(currentSession.value);

      // Add to queue, shuffle
      store.dispatch("startLearningSession", sessionId.value);
    });

    // Slideup animation on load
    onMounted(async () => {
      if (!allCardsDisplayed.value) {
        const [cardId] = currentSession.value.queue[0];

        const { id, definee, definition, definitionSource } = (await (
          await fetch(`${process.env.VUE_APP_API_URL}/card/${cardId}`)
        ).json()) as Card;

        Object.assign(store.state.flashcard, {
          id: id,
          definee: definee,
          definition: definition,
          definitionSource: definitionSource
        });
      }

      nextTick(() => {
        slideUp();
      });
    });

    // Logic of flashcards
    let cardId: string;
    let categoryId: string;
    watch(flashcardState, async stage => {
      console.log(stage);

      if (currentSession.value.queue.length === 0) {
        console.log("wszystkie karty wyswietlone");
        return;
      }

      console.log(currentSession.value.queue[0]);
      if (currentSession.value.queue.length > 1)
        console.log(currentSession.value.queue[1]);

      [cardId, categoryId] = computed(
        () => currentSession.value.queue[0]
      ).value;

      // console.log(cardId, categoryId);
      // console.log(currentSession.value.queue[0]);

      if (stage === 0) {
        const { id, definee, definition, definitionSource } = (await (
          await fetch(`${process.env.VUE_APP_API_URL}/card/${cardId}`)
        ).json()) as Card;

        Object.assign(store.state.flashcard, {
          id: id,
          definee: definee,
          definition: definition,
          definitionSource: definitionSource
        });
      } else if (stage === 2) {
        const choice = store.state.flashcard.userChoice;
        store.state.flashcard.userChoice = 0;

        if (choice === 0) {
          // Puts the definition back to level 0
          currentSession.value.queue[0][2] = 0;
          currentSession.value.futureBuckets[
            currentSession.value.queue[0][2] as 0 | 1 | 2 | 3
          ].unshift(currentSession.value.queue[0]);
        } else if (choice === 1) {
          // User has to choose this option two times
          // to advance. The maximum level you can have
          // only choosing this option is 1
          const prevBucket = currentSession.value.queue[0][2] as any;

          if (prevBucket >= 2) currentSession.value.queue[0][2] = 1;
          if (Number.isInteger(prevBucket)) {
            // If this is the first time the user choses
            // this option, put the definition back to
            // the same bucket
            currentSession.value.futureBuckets[
              currentSession.value.queue[0][2] as 0 | 1 | 2 | 3
            ].unshift(currentSession.value.queue[0]);
            currentSession.value.queue[0][2] += 0.5;
          } else {
            // If the user is visiting it for the second time,
            // even when chosing the same option, put the
            // definition one bucket higher
            currentSession.value.queue[0][2] += 0.5;
            currentSession.value.futureBuckets[
              currentSession.value.queue[0][2] as 0 | 1 | 2 | 3
            ].unshift(currentSession.value.queue[0]);
          }
        } else if (choice === 2) {
          // Simply advance the definition one step higher
          currentSession.value.queue[0][2] =
            Math.floor(currentSession.value.queue[0][2]) + 1;
          currentSession.value.futureBuckets[
            currentSession.value.queue[0][2] as 0 | 1 | 2 | 3
          ].unshift(currentSession.value.queue[0]);
        } else if (choice === 3) {
          // Advance the definition two steps higher
          currentSession.value.queue[0][2] =
            Math.floor(currentSession.value.queue[0][2]) + 2;

          if (currentSession.value.queue[0][2] > 3)
            currentSession.value.queue[0][2] = 3;

          currentSession.value.futureBuckets[
            currentSession.value.queue[0][2] as 0 | 1 | 2 | 3
          ].unshift(currentSession.value.queue[0]);
        }

        store.state.learn.categoryProgress[categoryId].cards = {
          cardId: currentSession.value.queue[0][2]
        };

        currentSession.value.queue.shift();

        store.state.flashcard.state = 0;

        console.log(currentSession.value.futureBuckets);
      }
      slideUp();
    });

    const handleClick = function() {
      // Slide down
      anime({
        targets: "main",
        duration: 300,
        translateY: [0, 20],
        opacity: [1, 0],
        easing: "easeOutExpo",
        complete: () =>
          // Update flashcard's state
          store.commit("updateFlashcardState", flashcardState.value + 1)
      });
    };

    return {
      definee,
      definition,
      definitionSource,
      flashcardState,
      allCardsDisplayed,
      handleClick
    };
  },
  beforeRouteLeave(to, from, next) {
    console.log("endlearningsession");
    this.$store.dispatch("endLearningSession");
    next();
  }
});
</script>

<style lang="scss" scoped>
.flashcards {
  display: grid;
  flex-direction: column;
  width: 100%;
  max-height: 100vh;
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
