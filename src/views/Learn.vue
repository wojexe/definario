<template>
  <main>
    <Section section-title="Wybierz zakres">
      <LearnCard />
    </Section>
    <Section class="section__picker">
      <LearnItemPicker @selected-changed="handleSelectedChange" />
      <LearnItemList
        v-if="selectedValues.length"
        style="margin-top: 1rem"
        :selected="selectedValues"
      />
    </Section>
    <Section section-title="Zapisane">
      <!-- TODO: vuex-persist; adjust these to be saved -->
      <LearnItemList v-if="selectedValues.length" :selected="selectedValues" />
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

import Section from "@/components/TheSection.vue";
import LearnCard from "@/components/cards/LearnCard.vue";
import LearnItemPicker from "@/components/learn/LearnItemPicker.vue";
import LearnItemList from "@/components/learn/LearnItemList.vue";
import CategoryProgress from "@/components/learn/CategoryProgress.vue";
import Button from "@/components/TheActionButton.vue";

export default defineComponent({
  name: "Learn",
  components: {
    Section,
    LearnCard,
    LearnItemPicker,
    LearnItemList,
    CategoryProgress,
    Button
  },
  setup() {
    const loadMoreProgress = function() {
      console.log("loadMoreProgress");
    };

    const selectedValues: Ref<Array<string>> = ref([]);

    const handleSelectedChange = function(v: Array<string>) {
      selectedValues.value = v;
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

    return {
      loadMoreProgress,
      selectedValues,
      handleSelectedChange,
      categories
    };
  }
});
</script>
