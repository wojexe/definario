<template>
  <main>
    <Section section-title="Definicja dnia">
      <HomeCard :definition-id="'2115'" />
    </Section>

    <Section
      section-title="Ostatnie"
      :section-subtitle="
        latestLength ? 'aby zobaczyć więcej swipeuj poziomo' : null
      "
    >
      <DefinitionCarousel />
    </Section>

    <Section
      section-title="Tablice maturalne"
      section-subtitle="zostaniesz przeniesiony do tablic"
    >
      <Button :arrow="true" content="OTWÓRZ" @click="openTables" />
    </Section>
  </main>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store/index";

import HomeCard from "@/components/cards/HomeCard.vue";
import Section from "@/components/TheSection.vue";
import Button from "@/components/TheActionButton.vue";
import DefinitionCarousel from "@/components/TheDefinitionCarousel.vue";

export default defineComponent({
  name: "Home",
  components: {
    HomeCard,
    Section,
    Button,
    DefinitionCarousel
  },
  setup() {
    const store = useStore();

    const latestLength = computed(() => store.state.latest.length);

    // uhhhhhh
    const openTables = function() {
      window.open(
        "https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2015/Informatory/2015/MATURA_2015_Wybrane_wzory_matematyczne.pdf"
      );
    };

    // return { carouselDefinitionList, openTables };
    return {
      latestLength,
      openTables
    };
  }
});
</script>
