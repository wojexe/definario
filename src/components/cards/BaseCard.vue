<template>
  <a @click="clickHandler" tabindex="0">
    <slot
      :definee="definee"
      :definition="definition"
      :definitionAbbr="definitionAbbr"
    />
    <Modal
      v-if="modalVisible"
      @close-modal="closeModal"
      :modal-visible="modalVisible"
      :modal-title="definee"
      :modal-definition="definition"
      :modal-definition-source="definitionSource"
      :modal-image="image"
      :modal-image-source="imageSource"
    />
  </a>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Modal from "@/components/TheModal.vue";

export default defineComponent({
  name: "BaseCard",
  components: {
    Modal
  },
  props: {
    definitionId: {
      type: String,
      required: true
    }
  },
  setup() {
    // TODO: download data from API; props.definitionID
    const definee = ref(`Granica ciągu`);
    const definition = ref(
      `wartość, w dowolnym otoczeniu której znajdują się prawie wszystkie (tzn. wszystkie poza skończenie wieloma) wyrazy danego ciągu. Inaczej – wartość, dowolnie blisko której leżą wszystkie wyrazy ciągu o dostatecznie dużych wskaźnikach.`
    );
    const definitionSource = ref(`matemaks.pl`);

    const image = ref("granica.png");
    const imageSource = ref(`matemaks.pl`);

    const modalVisible = ref(false);

    // Calculate abbreviation
    const definitionAbbr = ref(``);
    const calculateAbbr = function(maxCharacters: number) {
      definitionAbbr.value = "";
      let wordsToProvide = 0;
      let characterCount = 0;
      for (const c in definition.value.split("")) {
        characterCount += 1;
        if (definition.value.split("")[c] === " ") wordsToProvide += 1;
        if (characterCount > maxCharacters) break;
      }

      for (const w in definition.value.split(" ")) {
        definitionAbbr.value += definition.value.split(" ")[w] + " ";
        wordsToProvide -= 1;
        if (wordsToProvide === 0) break;
      }
      definitionAbbr.value = definitionAbbr.value.substr(
        0,
        definitionAbbr.value.length - 1
      );
      definitionAbbr.value += "...";
    };

    const textSizeQuery = window.matchMedia(
      "(min-width: 350px) and (min-height: 650px)"
    );

    textSizeQuery.matches ? calculateAbbr(70) : calculateAbbr(110);

    textSizeQuery.addEventListener("change", e => {
      e.matches ? calculateAbbr(70) : calculateAbbr(110);
    });

    return {
      definee,
      definition,
      definitionAbbr,
      definitionSource,
      image,
      imageSource,
      modalVisible
    };
  },
  methods: {
    clickHandler: function() {
      if (localStorage.getItem("modalNoClick") == null)
        this.modalVisible = !this.modalVisible;
    },
    closeModal() {
      this.modalVisible = !this.modalVisible;
    }
  }
});
</script>
