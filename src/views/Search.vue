<template>
  <main>
    <SearchBar v-model:phrase="searchPhrase" />
    <SearchDefinitionList :list="searchResults" ref="resultsContainer" />
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watchEffect, nextTick } from "vue";
import { Card, SearchResponse } from "types/definitions";

import anime from "animejs";

import SearchBar from "@/components/search/SearchBar.vue";
import SearchDefinitionList from "@/components/search/SearchDefinitionList.vue";

export default defineComponent({
  name: "Search",
  components: {
    SearchBar,
    SearchDefinitionList
  },
  setup() {
    const resultsContainer = ref();

    const searchPhrase = ref("");

    const searchResults: Ref<Array<Card>> = ref([]);

    const targets = [".search__definition-list__element", ".placeholder"];

    const waitTimeout = 1000;

    const outAnimation = async () =>
      anime({
        targets: targets,
        easing: "easeOutQuart",
        duration: 350,
        delay: anime.stagger(50),
        translateX: [0, 20],
        opacity: [1, 0]
      }).finished;

    async function doneTyping(s: string) {
      const res: { data: SearchResponse[] } = await (
        await fetch(`${process.env.VUE_APP_API_URL}/search?q=${s}`)
      ).json();

      // console.log(s, res.data);
      // console.log(resultsContainer.value.$el);

      await outAnimation();

      searchResults.value.splice(0, searchResults.value.length);

      res.data.forEach(obj =>
        searchResults.value.push({
          id: obj.id,
          definee: obj.title,
          definition: [
            {
              type: "string",
              value: obj.content
            }
          ],
          definitionSource: "matemaks.pl"
        })
      );

      nextTick(async () => {
        anime.set(targets, { opacity: 0, translateY: 0, translateX: 0 });

        await anime({
          targets: targets,
          easing: "easeOutQuint",
          duration: 350,
          delay: anime.stagger(50, { start: 100 }),
          translateY: [20, 0],
          opacity: [0, 1]
        }).finished;
      });
    }

    let typingTimer = 0;
    const handleTyping = async function(s: string) {
      clearTimeout(typingTimer);

      typingTimer = setTimeout(async () => {
        await doneTyping(s);
      }, waitTimeout);
    };

    watchEffect(async () => {
      if (searchPhrase.value) await handleTyping(searchPhrase.value);
    });

    return {
      resultsContainer,
      searchPhrase,
      searchResults
    };
  }
});
</script>

<style lang="scss" scoped>
main {
  margin: 0 auto;
  width: var(--width);
}
</style>
