<template>
  <main>
    <div class="presentation">
      <div class="presentation__title">od uczniów<br />dla uczniów</div>
      <p class="presentation__paragraph">
        Definario jest pierwszą polską platformą internetową stworzoną z myślą o
        szybkim dostępie do wiedzy, która przyda się każdemu uczniowi.
      </p>
      <router-link to="/home" custom v-slot="{ href, navigate }">
        <Button
          :arrow="true"
          :href="href"
          @click="
            navigate();
            saveSession();
          "
        />
      </router-link>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { v4 as uuid } from "uuid";

import Button from "@/components/TheActionButton.vue";
export default defineComponent({
  name: "Landing",
  components: {
    Button
  },
  methods: {
    saveSession() {
      localStorage.setItem("visited", "true");
      localStorage.setItem("token", uuid());
    }
  }
});
</script>

<style lang="scss" scoped>
body {
  overflow: hidden;
}

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin-top: 50vh;
  transform: translateY(-50%);
  background: rgb(var(--theme-color__background));
  .presentation {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &__title {
      display: block;
      text-align: center;
      font-weight: bold;
      font-size: var(--text-size--L);
      line-height: 1.5ch;
    }
    &__paragraph {
      display: block;
      text-align: center;
      font-weight: normal;
      font-size: var(--text-size--S);
      line-height: 1.5ch;
      max-width: 36ch;
    }
    button {
      margin-top: 5vh;
    }
  }
}
</style>
