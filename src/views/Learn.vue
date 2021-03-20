<template>
  <main>
    <Section section-title="Wybierz zakres">
      <LearnCard @click="startRevision" />
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

    const startRevision = function() {
      // console.log("REVISION DOESN'T YET WORK");
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
      // savedSessions
    };
  }
});
</script>
