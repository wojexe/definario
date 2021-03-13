<template>
  <div class="search__definition-list" ref="resultsContainer">
    <SearchCard
      v-show="!isEmpty"
      class="search__definition-list__element"
      v-for="({ id, definee, definition }, index) in list"
      :key="index"
      :id="id"
      :definee="definee"
      :definition="definition"
    />
    <span v-show="isEmpty" class="placeholder">
      brak definicji do pokazania
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, computed } from "vue";

import SearchCard from "@/components/cards/SearchCard.vue";

import anime from "animejs";

export default defineComponent({
  name: "SearchDefinitionList",
  components: {
    SearchCard
  },
  props: {
    list: Array
  },
  setup(props) {
    const resultsContainer = ref();

    const listLength = ref(props.list?.length);

    const isEmpty = computed(() => listLength.value === 0);

    watch(isEmpty, () => {
      console.log("change");
    });

    // console.log(isEmpty.value);

    onMounted(() => {
      if (!isEmpty.value)
        anime({
          targets: resultsContainer.value.children,
          delay: anime.stagger(50, { start: 200 }),
          duration: 350,
          easing: "easeOutQuart",
          translateY: [100, 0],
          opacity: [0, 1],
          zIndex: [-100, 0]
        });
    });

    return {
      resultsContainer,
      isEmpty
    };
  }
});
</script>

<style lang="scss" scoped>
.search {
  &__definition-list {
    max-width: 80%;
    margin: 0 auto;
    &__empty-message {
      color: rgba(var(--text-color__normal), 0.5);
    }
  }
}
</style>
