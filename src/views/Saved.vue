<template>
  <main>
    <Section section-title="Zapisane">
      <SavedCard
        v-show="!isEmpty"
        class="search__definition-list__element"
        v-for="({ id, definee, definition }, index) in savedDefinitions"
        :key="index"
        :id="id"
        :definee="definee"
        :definition="definition"
      />
      <span v-show="isEmpty" class="search__definition-list__empty-message">
        brak definicji do pokazania
      </span>
    </Section>
  </main>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store/index";

import Section from "@/components/TheSection.vue";
import SavedCard from "@/components/cards/SavedCard.vue";

export default defineComponent({
  name: "Saved",
  components: {
    Section,
    SavedCard
  },
  setup() {
    const store = useStore();

    const savedDefinitions = computed(() => store.state.saved.definitions);

    const isEmpty = computed(() => savedDefinitions.value.length === 0);

    return {
      savedDefinitions,
      isEmpty
    };
  }
});
</script>

<style lang="scss" scoped></style>
