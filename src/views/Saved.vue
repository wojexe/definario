<template>
  <main class="saved">
    <Section section-title="Zapisane" class="saved__section">
      <div
        class="saved__section__row"
        v-for="({ id, definee, definition }, index) in savedDefinitions"
        :key="index"
      >
        <SavedCard
          class="saved__section__row__content"
          :id="id"
          :definee="definee"
          :definition="definition"
        />
        <svg
          class="saved__section__row__delete-button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          tabindex="0"
          :id="id"
          @click="deleteSavedItem"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <span v-if="isEmpty" class="placeholder">
        brak zapisanych definicji
      </span>
    </Section>
  </main>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, nextTick } from "vue";
import { useStore } from "@/store/index";

import anime from "animejs";

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

    const deleteSavedItem = async function(e: PointerEvent) {
      const tParent = e.target as HTMLElement;
      const tdParent = (e.target as HTMLElement).parentElement;

      const id = tParent?.getAttribute("id") || tdParent?.getAttribute("id");

      let animationTarget: HTMLElement;

      if (tParent?.tagName === "div") animationTarget = tParent;
      else animationTarget = tdParent as HTMLElement;

      await anime({
        targets: animationTarget,
        duration: 500,
        easing: "easeOutExpo",
        translateX: [0, -30],
        opacity: [1, 0]
      }).finished;

      store.dispatch("deleteSavedDefinition", id);
    };

    onMounted(() =>
      nextTick(() => {
        if (!store.state.animated.saved) {
          const savedRows = document.getElementsByClassName(
            "saved__section__row"
          );
          anime({
            targets: savedRows,
            duration: 350,
            easing: "easeOutQuart",
            delay: anime.stagger(50, { start: 200 }),
            translateY: [100, 0],
            opacity: [0, 1],
            complete: () => store.commit("updateAnimatedSaved")
          });
        }
      })
    );

    return {
      savedDefinitions,
      deleteSavedItem,
      isEmpty
    };
  }
});
</script>

<style lang="scss" scoped>
.saved {
  &__section {
    &__row {
      position: relative;
      display: flex;
      flex-direction: row;
      margin-bottom: 2rem;
      max-width: 100%;

      &__delete-button {
        position: absolute;

        justify-self: center;
        right: 1ch;
        top: 1ch;
        position: absolute;
        height: 1em;
        font-size: var(--text-size--L);
        font-weight: bold;
        color: rgb(var(--text-color__normal));
        border-radius: 100px;
        cursor: pointer;
        background: #fff;

        will-change: transform filter;
        transition: 150ms all ease-in-out;
        &:hover {
          transform: scale(1.2);
        }
        &:focus-visible {
          transform: scale(1.2);
        }
        &:active {
          transform: scale(0.9);
        }
      }
    }
  }
}
</style>
