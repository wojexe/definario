<template>
  <main>
    <Section section-title="Definicja dnia">
      <Card :definition-id="'2115'" />
    </Section>

    <Section
      section-title="Ostatnie"
      section-subtitle="aby zobaczyć więcej swipeuj poziomo"
    >
      <DefinitionCarousel :definition-list="carouselDefinitionList" />
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
import { defineComponent, ref } from "vue";
import Card from "@/components/cards/HomeCard.vue";
import Section from "@/components/TheSection.vue";
import Button from "@/components/TheActionButton.vue";
import DefinitionCarousel from "@/components/TheDefinitionCarousel.vue";

export default defineComponent({
  name: "Home",
  components: {
    Card,
    Section,
    Button,
    DefinitionCarousel
  },
  setup() {
    const carouselDefinitionList = ref<string[]>();

    const tempArr: string[] = [];
    for (let i = 0; i < 15; i++) tempArr.push(`${i + 1}`);

    carouselDefinitionList.value = tempArr;

    // uhhhhhh
    const openTables = function() {
      window.open(
        "https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2015/Informatory/2015/MATURA_2015_Wybrane_wzory_matematyczne.pdf"
      );
    };

    return { carouselDefinitionList, openTables };
  }
});
</script>
