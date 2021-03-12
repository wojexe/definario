<template>
  <main>
    <SearchBar v-model:phrase="searchPhrase" />
    <SearchDefinitionList :list="searchResults" />
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watchEffect } from "vue";
import { DefinitionObject } from "@/../types/definition";

import SearchBar from "@/components/search/SearchBar.vue";
import SearchDefinitionList from "@/components/search/SearchDefinitionList.vue";

export default defineComponent({
  name: "Search",
  components: {
    SearchBar,
    SearchDefinitionList
  },
  setup() {
    const searchPhrase = ref("");

    function doneTyping(s: string) {
      console.log("doneTyping", s);
      s; // TODO: FETCH DATA;
    }

    let typingTimer = 0;
    const handleTyping = function(s: string) {
      clearTimeout(typingTimer);

      typingTimer = setTimeout(() => {
        doneTyping(s);
      }, 500);
    };

    watchEffect(() => {
      if (searchPhrase.value) handleTyping(searchPhrase.value);
    });

    const searchResults: Ref<Array<DefinitionObject>> = ref([
      {
        id: "1",
        definee: "Koło",
        definition: [
          {
            type: "block-image",
            value: "id.svg"
            // value:
            //   "koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło"
          },
          {
            type: "string",
            value: "koło koło koło koło koło"
          },
          {
            type: "inline-image",
            value: "long.svg"
          },
          {
            type: "string",
            value: "koło koło koło koło koło"
          }
        ],
        definitionSource: "matemaks.pl"
      },
      {
        id: "2",
        definee: "Ułamki niewłaściwe",
        definition: [
          {
            type: "string",
            value:
              "ułamki niewłaściwe ułamki niewłaściwe ułamki niewłaściwe ułamki niewłaściwe ułamki niewłaściwe ułamki niewłaściwe ułamki niewłaściwe ułamki niewłaściwe ułamki niewłaściwe ułamki niewłaściwe"
          }
        ],
        definitionSource: "matemaks.pl"
      }
    ]);

    return {
      searchPhrase,
      searchResults
    };
  }
});
</script>

<style lang="scss" scoped>
main {
  margin: 0 auto;
  width: clamp(10ch, 100%, 46ch);
}
</style>
