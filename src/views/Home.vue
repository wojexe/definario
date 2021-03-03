<template>
  <main>
    <Section section-title="Definicja dnia">
      <Card :definition-id="2115" />
    </Section>

    <Section
      section-title="Ostatnie"
      section-subtitle="aby zobaczyć więcej swipeuj poziomo"
    >
      <DefinitionCarousel :definition-list="carouselDefinitionList" />
    </Section>

    <Section
      section-title="Tablice maturalne"
      section-subtitle="aby wrócić swipenij z lewej"
    >
      <!-- TODO: ADD PROPER NAVIGATION HERE -->
      <router-link
        to="/home/mathematical_tables"
        custom
        v-slot="{ href, navigate }"
      >
        <Button
          :arrow="true"
          content="OTWÓRZ"
          :href="href"
          @click="navigate()"
        />
      </router-link>
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
    const carouselDefinitionList = ref<number[]>();

    const tempArr: number[] = [];
    for (let i = 0; i < 15; i++) tempArr.push(i + 1);

    carouselDefinitionList.value = tempArr;

    return { carouselDefinitionList };
  }
});
</script>
