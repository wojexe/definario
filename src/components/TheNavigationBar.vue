<template>
  <nav class="navigation" :class="visible ? 'navigation--visible' : ''">
    <div class="navigation__wrapper">
      <NavigationButton destination="home" v-html="svg.home" />
      <NavigationButton destination="learn" v-html="svg.learn" />
      <NavigationButton destination="search" v-html="svg.search" />
      <NavigationButton destination="saved" v-html="svg.saved" />
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavigationButton from "@/components/navigation/BaseNavigationBarButton.vue";

export default defineComponent({
  name: "NavigationBar",
  components: {
    NavigationButton
  },
  data() {
    return {
      svg: {
        home: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>`,
        learn: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>`,
        search: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>`,
        saved: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>`
      }
    };
  },
  props: {
    visible: Boolean
  }
});
</script>

<style lang="scss" scoped>
span {
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  background-color: red;
  z-index: 1000;
}

.navigation {
  position: fixed;

  padding-top: 1rem;
  padding-bottom: max(var(--sab), 1rem);

  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  bottom: 0;
  left: 0;

  &__wrapper {
    display: flex;
    justify-content: space-between;
    width: clamp(15ch, 100%, 270px);
  }

  will-change: opacity;
  transition: 150ms ease-in-out all;
  transform: translateY(100%);
  backdrop-filter: blur(0);
  opacity: 0;

  &--visible {
    transform: translateY(0);
    backdrop-filter: blur(20px);
    opacity: 1;
  }
}
</style>
