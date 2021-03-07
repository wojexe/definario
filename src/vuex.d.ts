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
    homePage: {
      featured: {
        id: string;
        definee: string;
        definition: string;
        endsAt: Date;
      };
      carousel: {
        blockModal: boolean;
      };
      lastVisited: string[];
    };
    learn: {
      lastChosen: [
        {
          categories: string[];
        }
      ];
      progress: [
        {
          name: string;
          value: number;
        }
      ];
    };
    flashcards: {
      currentDefinee: string;
      currentDefinition: string;
      currentDefinitionId: string;
      currentDefinitionUserKnowledge: number;
      definitionIdScore: string;

      gameHistory: [{}];
    };
    saved: {
      definitions: [
        {
          id: string;
          definee: string;
          definition: string;
        }
      ];
    };
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
