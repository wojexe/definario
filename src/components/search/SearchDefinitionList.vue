<template>
  <div
    v-if="list.length"
    class="search__definition-list"
    ref="resultsContainer"
  >
    <SearchCard
      class="search__definition-list__element"
      v-for="({ id, definee, definition }, index) in list"
      :key="index"
      :id="id"
      :definee="definee"
      :definition="definition"
    />
  </div>
  <span v-else class="placeholder">
    brak definicji do pokazania
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import SearchCard from "@/components/cards/SearchCard.vue";

export default defineComponent({
  name: "SearchDefinitionList",
  components: {
    SearchCard
  },
  props: {
    list: Array
  }
});
</script>

<style lang="scss" scoped>
.search {
  &__definition-list {
    max-width: 80%;
    justify-self: center;
    &__empty-message {
      color: rgba(var(--text-color__normal), 0.5);
    }
  }
}
</style>
