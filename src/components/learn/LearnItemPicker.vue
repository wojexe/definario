<template>
  <MultiSelect
    v-model="value"
    mode="multiple"
    noResultsText="Nie znaleziono"
    placeholder="Wyszukaj działy"
    noOptionsText="Lista jest pusta"
    :multipleLabel="multipleLabel"
    :options="pickerOptions"
    :object="true"
    valueProp="id"
    trackBy="label"
    label="label"
    :caret="true"
    :searchable="true"
    @change="emitValue"
  ></MultiSelect>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";

import MultiSelect from "@vueform/multiselect";

export default defineComponent({
  name: "LearnItemPicker",
  components: {
    MultiSelect
  },
  emits: ["selectedChanged"],
  setup(_, { emit }) {
    const pickerOptions = ref([
      { id: "a", label: "Koło" },
      { id: "b", label: "Granica ciągu" },
      { id: "c", label: "Liczby pierwsze" },
      { id: "d", label: "Wzory redukcyjne" }
    ]);

    // const pickerOptions = ref([
    //   "Koło",
    //   "Granica ciągu",
    //   "Liczby pierwsze",
    //   "Wzory redukcyjne"
    // ]);

    const multipleLabel = function(v: Array<string>) {
      if (v.length === 1) return "Wybrano 1 element";
      else if (v.length < 20 && v.length > 9)
        return `Wybrano ${v.length} elementów`;
      else {
        const unitDigit = v.length % 10;

        if (unitDigit > 1 && unitDigit < 5)
          return `Wybrano ${v.length} elementy`;
        else return `Wybrano ${v.length} elementów`;
      }
    };

    const value: Ref<Array<string>> = ref([]);

    const emitValue = function(v: Array<string>) {
      emit("selectedChanged", v);
    };

    return {
      pickerOptions,
      multipleLabel,
      value,
      emitValue
    };
  }
});
</script>

<style lang="scss">
.multiselect {
  position: relative;
  width: clamp(10ch, 100%, 36ch);
  font-size: var(--text-size--M);
}

.multiselect.is-searchable {
  cursor: auto;
}

.multiselect-input {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  min-height: 4ch;
  border-radius: 100px;
  background-color: rgb(var(--theme-color__card--background));
  box-shadow: var(--theme-shadow__card);
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  outline: none;
}

// Caret
.multiselect-input:before {
  position: absolute;
  right: 22px;
  top: 50%;
  color: #999;
  border-style: solid;
  border-width: 6px 6px 0;
  border-color: #999 transparent transparent;
  content: "";
  transform: translateY(-50%);
  transition: 0.3s transform;
}

.is-disabled .multiselect-input {
  background: #f9f9f9;
}

.is-open .multiselect-input {
  border-radius: 25px 25px 0 0;
}

.is-open .multiselect-input:before {
  transform: translateY(-50%) rotate(180deg);
}

.multiselect-placeholder,
.multiselect-single-label,
.multiselect-multiple-label {
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 20px;
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  background: transparent;
}

.multiselect-placeholder {
  color: rgba(var(--text-color__normal), 0.5);
}

.is-single .multiselect-search,
.is-multiple .multiselect-search {
  display: flex;
  height: 100%;
  width: 100%;
  background: transparent;
}

.is-single .multiselect-search input,
.is-multiple .multiselect-search input {
  width: 100%;
  border: 0;
  padding: 8px 35px 8px 20px;
  outline: none;
  background: transparent;
  font-size: var(--text-size--M);
  font-family: inherit;
}

.is-single.no-caret .multiselect-search input,
.is-multiple.no-caret .multiselect-search input {
  padding: 8px 20px 8px 20px;
}

.multiselect-clear {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: calc(18px - 1ch);
  border-radius: 10px;
  width: 1.5ch;
  height: 1.5ch;
  padding: 1ch;
  background: #fff;

  &:before,
  &:after {
    position: absolute;
    content: " ";
    height: 16px;
    width: 2px;
    border-radius: 10px;
    background-color: #999;
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }

  &:hover {
    &:before,
    &:after {
      background-color: #555;
    }
  }
}

.multiselect-options {
  position: absolute;
  left: 0;
  right: 0px;
  border-top: 1px solid #e8e8e8;
  margin-top: -1px;
  max-height: 160px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  box-shadow: var(--theme-shadow__card);
  border-radius: 0 0 25px 25px;
  z-index: 100;
  background: #ffffff;
}

.multiselect-option {
  display: flex;
  min-height: 40px;
  padding: 9px 12px;
  box-sizing: border-box;
  color: #222;
  text-decoration: none;
  align-items: center;
  justify-content: flex-start;
  text-align: left;

  span {
    transition: 100ms ease-in-out transform;
    will-change: transform;
  }

  &:active span {
    transform: scale(0.925);
  }
}

.multiselect-option.is-pointed {
  background: #e6e6e6;
}

.multiselect-option.is-disabled {
  background: #f9f9f9;
  color: #a6a6a6;
  cursor: not-allowed;
}

.multiselect-option.is-selected {
  font-weight: bold;
  color: black;

  span {
    &::after {
      content: "✅️";
      font-size: var(--text-size--S);
      position: relative;
      left: 1ch;
      line-height: 1ch;
    }
  }
}

.multiselect-option.is-selected.is-pointed {
  background: rgba(0, 0, 0, 0.2);
}

.multiselect-no-options,
.multiselect-no-results {
  display: flex;
  padding: 10px 12px;
  color: rgba(var(--text-color__normal), 0.5);
}
</style>
