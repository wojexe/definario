<template>
  <component
    v-bind="$attrs"
    v-for="({ type, value }, index) in content"
    :key="index"
    :is="getComponentType(type)"
    :src="getComponentType(type) === 'img' ? getSourcePath(value) : null"
    :class="type"
    class="definition-part"
    v-text="type === 'string' ? value : null"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

interface Content {
  [index: number]: {
    type: string;
    value: string;
  };
}

export default defineComponent({
  name: "ContentRenderer",
  props: {
    content: {
      type: Array as PropType<Content>,
      required: true
    }
  },
  setup() {
    const getComponentType = function(s: string) {
      if (s === "string") return "span";
      else return "img";
    };
    const getSourcePath = function(s: string) {
      return `https://defi.rabulinski.com/img/definitions/${s}`;
      // return `/img/definitions/${s}`;
    };

    return {
      getComponentType,
      getSourcePath
    };
  }
});
</script>

<style lang="scss" scoped>
.definition-part {
  word-break: break-word;
}
.block-image {
  display: block;
  margin: 0.5ch auto;
  font-size: inherit;
  min-height: 1ch;
  height: 2ch;
  max-width: 100%;
}
.inline-image {
  display: inline;
  font-size: inherit;
  min-height: 1ch;
  height: 1.25ch;
  margin: 0 0.5ch;
  vertical-align: middle;
  max-width: 100%;
}
</style>
