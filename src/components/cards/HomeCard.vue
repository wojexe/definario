<template>
  <BaseCard #default="{ definee, definition }" class="card card--home">
    <span class="card__header">
      {{ definee }}
    </span>
    <p class="card__content">
      {{ definition }}
    </p>
  </BaseCard>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseCard from "@/components/cards/BaseCard.vue";

export default defineComponent({
  name: "HomeCard",
  components: {
    BaseCard
  }
});
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  padding: 2ch;
  padding-top: 1.5ch;

  text-decoration: none;
  cursor: pointer;
  color: black;
  background-color: rgb(var(--theme-color__card--background));
  border-radius: 35px;
  &__header {
    display: flex;
    justify-content: center;
    position: relative;
    font-size: var(--text-size--MP);
    font-weight: 600;
    margin-bottom: 1.4ch;
    &::after,
    &::before {
      display: block;
      content: "";

      position: absolute;
      bottom: -0.85ch;
      transform: translateX(75%);

      width: calc(var(--text-size--MP) * 2);
      height: 0.3ch;

      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 20px;
    }
    &::before {
      transform: translateX(-75%);
    }
  }
  &__content {
    font-size: var(--text-size--S);
  }
  p {
    margin: 0;
  }

  // Shadows
  &::after,
  &::before,
  &:focus {
    transition: 200ms all ease-in-out;
    will-change: opacity;
  }

  &::after,
  &::before {
    content: "";

    top: 0;
    right: 0;
    position: absolute;

    width: 100%;
    height: 100%;

    border-radius: 35px;
  }

  &::after {
    box-shadow: 0 16px 64px
      rgba(var(--theme-shadow__card__color), var(--theme-shadow__card__opacity));
    opacity: 1;
  }

  &::before {
    box-shadow: 0 8px 42px
      rgba(
        var(--theme-shadow__card__color),
        calc(var(--theme-shadow__card__opacity) * 2)
      );
    opacity: 0;
  }

  &:hover {
    &::after {
      opacity: 0;
    }

    &::before {
      opacity: 1;
    }
  }

  &:focus {
    &::after,
    &::before {
      opacity: 0;
    }
    box-shadow: 0 16px 64px
      rgba(
        var(--theme-shadow__card__color),
        calc(var(--theme-shadow__card__opacity) * 3)
      );
  }
}
</style>
