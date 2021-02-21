<template>
  <BaseCard #default="{ definee, definitionAbbr }">
    <div class="carousel__card">
      <span class="carousel__card__title">{{ definee }}</span>
      <p class="carousel__card__definitionShort">
        {{ definitionAbbr }}
      </p>
    </div>
  </BaseCard>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseCard from "@/components/cards/BaseCard.vue";

export default defineComponent({
  name: "CarouselCard",
  components: {
    BaseCard
  }
});
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.carousel {
  &__card {
    display: grid;
    grid-template-rows:
      min-content
      1fr;
    gap: 1ch;
    width: 100%;
    border-radius: 30px;
    padding: 1.5ch;

    background: white;
    color: var(--text-color__normal);

    text-align: center;

    box-sizing: border-box;

    overflow: hidden;
    text-overflow: ellipsis;

    cursor: pointer;

    &__title {
      font-size: var(--text-size--L);
      font-weight: bold;
      font-style: italic;
      line-height: 1.5ch;
      letter-spacing: -0.08ch;
      box-sizing: border-box;
    }

    &__definitionShort {
      font-size: var(--text-size--S);
      box-sizing: border-box;
      height: 100%;
      // margin: 1ch 0 0 0;
    }
  }
}
</style>
