<template>
  <div class="flashcards">
    <Definee />
    <Definition />
    <ActionPicker />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, nextTick } from "vue";
import Definee from "@/components/learn/flashcards/Definee.vue";
import Definition from "@/components/learn/flashcards/Definition.vue";
import ActionPicker from "@/components/learn/flashcards/ActionPicker.vue";

export default defineComponent({
  name: "Flashcards",
  components: {
    Definee,
    Definition,
    ActionPicker
  },
  setup() {
    // onMounted(() => nextTick(() => {}));
    return {};
  }
});
</script>

<style lang="scss" scoped>
.flashcards {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  justify-content: center;
  align-items: center;
}
</style>
