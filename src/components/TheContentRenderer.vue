<template>
  <component
    v-bind="$attrs"
    v-for="({ type, value, inlineSize }, index) in content"
    :key="index"
    :is="getComponentType(type)"
    :src="getComponentType(type) === 'img' ? getSourcePath(value) : null"
    :class="{
      [type]: type,
      raster: isRasterImage(value),
      'no-block-images': isRasterImage(value) && noBlockImages,
      fraction: isFraction(inlineSize)
    }"
    class="definition-part"
    v-text="getComponentType(type) === 'span' ? value : null"
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
    },
    noBlockImages: Boolean
  },
  setup() {
    const getComponentType = function(s: string) {
      if (s === "string" || s === "bold") return "span";
      else return "img";
    };

    const getSourcePath = function(s: string) {
      return s;
    };

    const isRasterImage = (s: string) => {
      return s.match(/\/raster\//g) ? true : false;
    };

    const isFraction = (s: string) => (s === "fraction" ? true : false);

    return {
      getComponentType,
      getSourcePath,
      isRasterImage,
      isFraction
    };
  }
});
</script>

<style lang="scss" scoped>
.string,
.bold {
  &::after {
    content: " ";
  }
}
.bold {
  font-weight: 600;
}
.fraction {
  vertical-align: middle !important;
}
.no-block-images {
  display: none;
}
.definition-part {
  word-break: break-word;
}
.block-image {
  display: block;
  margin: 0.5em auto;
  font-size: inherit;
  min-height: 1em;
  // height: 2ch;
  max-width: 100%;
}
.inline-image {
  display: inline;
  font-size: inherit;
  min-height: 1ch;
  // height: 1.25ch;
  margin: 0 0.15em;
  vertical-align: baseline;
  max-width: 100%;
}
.raster {
  max-width: 80%;
  max-height: 36ch;
}
</style>
