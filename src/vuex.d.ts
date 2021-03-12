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
      lastVisited: Array<string>;
    };

    learn: {
      savedSessions: Array<{
        categories: Array<string>;
      }>;
      progress: Array<{
        name: string;
        value: number;
      }>;
    };

    flashcards: {
      state: flashcardState;

      currentDefinitionId: string;

      currentDefinee: string;
      currentDefinition: string;
      currentUserChoice: number;
      definitionIdScore: number;

      gameHistory: Record<string, Array<string>>;
    };

    saved: {
      definitions: Array<{
        id: string;
        definee: string;
        definition: string;
      }>;
    };

    animated: {
      carousel: boolean;
      saved: boolean;
    };
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
