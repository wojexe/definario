import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";

declare module "@vue/runtime-core" {
  // declare your own store states
  export interface State {
    modal: {
      visible: boolean;
      definee: string;
      definition: string;
      definitionSource: string;
      modalImage: string;
      modalImageSource: string;
    };
    carousel: {
      blockModal: boolean;
    };
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
