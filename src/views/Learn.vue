<template>
  <main>
    <Section section-title="Wybierz zakres">
      <LearnCard @click="startRevision" />
      <span class="session-undefined">nie znaleziono odpowiedniej sesji</span>
    </Section>
    <Section class="section__picker">
      <LearnItemPicker @selected-changed="handleSelectedChange" ref="picker" />
      <LearnItemList
        v-if="selectedValues.length"
        style="margin-top: 1rem"
        :selected="selectedValues"
        @saved-session="clearSelectedItems"
      />
    </Section>
    <Section section-title="Zapisane">
      <LearnSavedList />
    </Section>
    <Section section-title="Postępy w nauce">
      <CategoryProgress :categories="categoriesToShow" />
      <Button
        style="margin-top: 2rem;"
        content="POKAŻ WIĘCEJ"
        v-if="shouldShowButton"
        @click="loadMoreProgress"
      />
    </Section>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store/index";

import anime from "animejs";

import Section from "@/components/TheSection.vue";
import LearnCard from "@/components/cards/LearnCard.vue";
import LearnItemPicker from "@/components/learn/LearnItemPicker.vue";
import LearnItemList from "@/components/learn/LearnItemList.vue";
import LearnSavedList from "@/components/learn/LearnSavedList.vue";
import CategoryProgress from "@/components/learn/CategoryProgress.vue";
import Button from "@/components/TheActionButton.vue";

export default defineComponent({
  name: "Learn",
  components: {
    Section,
    LearnCard,
    LearnItemPicker,
    LearnItemList,
    LearnSavedList,
    CategoryProgress,
    Button
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const selectedValues: Ref<Array<string>> = ref([]);

    const handleSelectedChange = function(v: Array<string>) {
      selectedValues.value = v;
    };

    const picker = ref();
    const clearSelectedItems = function() {
      picker.value.value = [];
      selectedValues.value = [];
    };

    const itemsToShow = ref(3);

    const categoriesLength: Ref<number> = ref(0);
    const categoriesToShow: Ref<[label: string, score: number][]> = ref([]);
    watchEffect(() => {
      let res: [label: string, score: number][] = [];
      Object.entries(store.state.learn.categoryProgress)
            .map(cat => res.push([cat[1].label,
                                  cat[1].score]));

      // Filter scores equal to 0 and sort them in descending order
      res = res.filter(([, n]) => n !== 0 && !isNaN(n))
               .sort( ([, a], [, b]) => b - a );

      categoriesLength.value = res.length;
      categoriesToShow.value = res.slice(0, itemsToShow.value);
    })

    const loadMoreProgress = function() {
      if (categoriesLength.value - itemsToShow.value < 3)
        itemsToShow.value = categoriesLength.value;
      else itemsToShow.value += 3;
    };

    const shouldShowButton = computed(() => categoriesLength.value > itemsToShow.value);

    const showUndefinedSessionPopup = async () => {
      await anime({
        targets: ".session-undefined",
        duration: 250,
        easing: "easeInOutExpo",
        translateY: [-10, 10],
        opacity: [0, 1]
      }).finished

      await anime({
        targets: ".session-undefined",
        delay: 1000,
        duration: 250,
        easing: "easeInOutExpo",
        translateY: -10,
        opacity: 0,
      }).finished
    }

    const startRevision = function() {
      if (store.state.learn.savedSessions[store.state.learn.latestLearningSession] === (null || undefined)) {
        showUndefinedSessionPopup();
        return;
      }

      anime({
        targets: "main",
        duration: 250,
        easing: "easeInOutExpo",
        translateY: [0, 20],
        opacity: [1, 0],
        complete: () => {
          router.push({ name: "Flashcards", params: { id: store.state.learn.latestLearningSession }, query: { revision: "true" } });
        }
      });
    };

    return {
      loadMoreProgress,
      shouldShowButton,
      selectedValues,
      handleSelectedChange,
      picker,
      clearSelectedItems,
      categoriesToShow,
      startRevision
    };
  }
});
</script>

<style lang="scss" scoped>
.section {
  position: relative;
}

.session-undefined {
  position: absolute;
  bottom: 0;
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
</style>
