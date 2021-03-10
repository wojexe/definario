<template>
  <Skeleton
    :header-is-visible="headerIsVisible"
    :header-is-landing="headerIsLanding"
    :header-is-offline="headerIsOffline"
    :header-back-arrow="headerBackArrow"
    :navigation-is-visible="navigationIsVisible"
  >
    <router-view />
  </Skeleton>
</template>

<script lang="ts">
import {
  defineComponent,
  watchEffect,
  watch,
  ref,
  computed,
  onMounted
  // nextTick
} from "vue";
import { useRoute } from "vue-router";
import { useStore } from "./store/index";

// import anime from "animejs";

import Skeleton from "@/components/TheSkeleton.vue";

export default defineComponent({
  components: {
    Skeleton
  },
  setup() {
    const headerIsVisible = ref(true);
    const headerIsLanding = ref(false);
    const headerBackArrow = ref(false);
    const headerIsOffline = ref(false);
    const navigationIsVisible = ref(true);

    const route = useRoute();

    // On route change check header and navbar props
    watchEffect(() => {
      const meta = route.meta;
      if (meta.header && meta.navbar) {
        headerIsVisible.value = meta.header.visible;
        headerIsLanding.value = meta.header.landing;
        headerBackArrow.value = meta.header.backArrow ?? false;
        navigationIsVisible.value = meta.navbar.visible;
      }
    });

    // Check if app is online
    function updateOnlineStatus() {
      const isOnline = navigator.onLine ? true : false;

      headerIsOffline.value = !isOnline;
    }
    onMounted(() => {
      updateOnlineStatus();
      window.addEventListener("online", updateOnlineStatus);
      window.addEventListener("offline", updateOnlineStatus);
    });

    // Check if modal should be visible
    const store = useStore();
    const modalIsVisible = computed(() => store.state.modal.visible);
    watch(modalIsVisible, now => {
      if (now) document.body.setAttribute("modal-open", "");
      else document.body.removeAttribute("modal-open");
    });

    return {
      headerIsLanding,
      headerIsVisible,
      headerIsOffline,
      headerBackArrow,
      navigationIsVisible
    };
  }
});
</script>

<style lang="scss">
#app {
  display: flex;
  font-family: "Poppins", ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans",
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    "Noto Color Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  -webkit-tap-highlight-color: transparent;

  min-height: 100vh;
}

::selection {
  background-color: rgba(0, 0, 0, 0.4);
}

:focus {
  outline: none;
}

:root {
  // Safe area
  --sat: env(safe-area-inset-top);
  --sar: env(safe-area-inset-right);
  --sab: env(safe-area-inset-bottom);
  --sal: env(safe-area-inset-left);
}

body {
  --theme-color__primary: 62, 133, 238;
  --theme-color__secondary: 227, 137, 240;
  --theme-color__accent: 243, 192, 124;
  --theme-color__background: 245, 245, 245;
  --theme-color__card--background: 255, 255, 255;

  --theme-gradient: radial-gradient(
    60% 115% at 2% 14%,
    #3e85ee 2%,
    #e389f0 50%,
    #f3c07c 90%
  );

  --theme-shadow__card__color: 0, 0, 0;
  --theme-shadow__card__opacity: 0.1;
  --theme-shadow__card__x: 0;
  --theme-shadow__card__y: 5px;
  --theme-shadow__card__radius: 25px;

  --theme-shadow__card: var(--theme-shadow__card__x)
    var(--theme-shadow__card__y) var(--theme-shadow__card__radius)
    rgba(var(--theme-shadow__card__color), var(--theme-shadow__card__opacity));

  --text-color__normal: 0, 0, 0;
  --text-color__paragraph: 40, 40, 40;

  --text-size--XS: 0.75rem;
  --text-size--S: 0.9rem;
  --text-size--M: 1rem;
  --text-size--MP: 1.1rem;
  --text-size--L: 1.5rem;
  --text-size--XL: 1.75rem;
  --text-size--XXL: 2.5rem;

  @media (min-width: 350px) and (min-height: 650px) {
    --text-size--XS: 0.9rem;
    --text-size--S: 1rem;
    --text-size--M: 1.25rem;
    --text-size--MP: 1.35rem;
    --text-size--L: 1.75rem;
    --text-size--XL: 2rem;
    --text-size--XXL: 3rem;
  }

  --width: clamp(10ch, 100%, 64ch);

  color: rgb(var(--text-color__normal));
  background: rgb(var(--theme-color__background));

  min-height: 100vh;

  /* Disables pull-to-refresh but allows overscroll glow effects. */
  overscroll-behavior-y: none;

  &[modal-open] {
    overflow: hidden;
  }
}
</style>
