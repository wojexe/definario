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
        :add="true"
        @saved-session="clearSelectedItems"
      />
    </Section>
    <Section section-title="Zapisane">
      <LearnSavedList />
    </Section>
    <Section section-title="Postępy w nauce">
      <CategoryProgress :categories="categories" />
      <Button
        style="margin-top: 2rem;"
        content="POKAŻ WIĘCEJ"
        @click="loadMoreProgress"
      />
    </Section>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
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

    const loadMoreProgress = function() {
      console.log("loadMoreProgress");
    };

    const selectedValues: Ref<Array<string>> = ref([]);

    const handleSelectedChange = function(v: Array<string>) {
      selectedValues.value = v;
    };

    const picker = ref();
    const clearSelectedItems = function() {
      picker.value.value = [];
      selectedValues.value = [];
    };

    const categories: Array<{
      id: string;
      title: string;
      percentage: number;
    }> = [
      {
        id: "a",
        title: "Trygonometria",
        percentage: 88
      },
      {
        id: "b",
        title: "Geometria analityczna",
        percentage: 57
      }
    ];

    const startRevision = function() {
      anime({
        targets: "main",
        duration: 250,
        easing: "easeInOutExpo",
        translateY: [0, 20],
        opacity: [1, 0],
        complete: () => {
          store.dispatch("startLearningSession", "revision");
          router.push({ name: "Flashcards", params: { id: "revision" } });
        }
      });
    };

    return {
      loadMoreProgress,
      selectedValues,
      handleSelectedChange,
      picker,
      clearSelectedItems,
      categories,
      startRevision
      // savedSessions
    };
  }
});
</script>
