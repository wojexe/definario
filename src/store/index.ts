// store.ts
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

enum flashcardState {
  Think = 0,
  Rate,
  WillChange,
  NextFlashcard
}

// Define your typings for the store state
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

// Define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    modal: {
      visible: false,
      definee: "",
      definition: "",
      definitionSource: "",
      modalImage: "",
      modalImageSource: ""
    },
    homePage: {
      featured: {
        id: "",
        definee: "",
        definition: "",
        endsAt: new Date()
      },
      carousel: {
        blockModal: false
      },
      lastVisited: []
    },
    learn: {
      savedSessions: [
        {
          categories: []
        }
      ],
      progress: [
        {
          name: "trygonometria",
          value: 0
        },
        {
          name: "trygonometria",
          value: 0
        }
      ]
    },

    flashcards: {
      state: flashcardState.Think,

      currentDefinitionId: "",

      currentDefinee: "",
      currentDefinition: "",
      currentUserChoice: 0,
      definitionIdScore: 0,

      gameHistory: {
        "": [""]
      }
    },

    saved: {
      definitions: [
        {
          id: "",
          definee: "saved",
          definition: "saved:)"
        }
      ]
    },

    animated: {
      carousel: false,
      saved: false
    }
  },
  mutations: {
    featuredUpdateId(store, id: string) {
      store.homePage.featured.id = id;
    },
    featuredUpdateDefinee(store, s: string) {
      store.homePage.featured.definee = s;
    },
    feturedUpdateDefinition(store, s: string) {
      store.homePage.featured.definition = s;
    },
    feturedUpdateEndsAt(store, s: Date) {
      store.homePage.featured.endsAt = s;
    },
    modalUpdateVisibility(store, b: boolean) {
      store.modal.visible = b;
    },
    modalUpdateDefinee(store, s: string) {
      store.modal.definee = s;
    },
    modalUpdateDefinition(store, s: string) {
      store.modal.definition = s;
    },
    modalUpdateDefinitionSource(store, s: string) {
      store.modal.definitionSource = s;
    },
    modalUpdateImage(store, s: string) {
      store.modal.modalImage = s;
    },
    modalUpdateImageSource(store, s: string) {
      store.modal.modalImageSource = s;
    },
    carouselUpdateBlock(store, b: boolean) {
      store.homePage.carousel.blockModal = b;
    },
    updateLastVisited(store, n: string) {
      store.homePage.lastVisited.unshift(n);
    },
    updateAnimatedCarousel(store) {
      store.animated.carousel = true;
    },
    updateAnimatedSaved(store) {
      store.animated.saved = true;
    },
    updateFlashcardState(store, s: flashcardState) {
      store.flashcards.state = s;
    },
    updateCurrentUserChoice(store, n: number) {
      store.flashcards.currentUserChoice = n;
    }
  },
  actions: {
    async initialFetch({ commit }) {
      const data = await (await fetch(`/definitions/manif.json`))
        .json()
        .catch(err => {
          console.log(err);
          throw Error(err);
        });
      data;
      commit;
      // console.log(data);

      // commit("updateManifest", data);
    },
    async modalUpdate({ commit }, id: string) {
      const fetch = async function(id: string) {
        return {
          visible: true,
          definee: `Koło ${id}`,
          definition: `zbiór wszystkich punktów płaszczyzny, których odległość od ustalonego punktu na tej płaszczyźnie, nazywanego środkiem koła, jest mniejsza lub równa długości promienia koła.\n
          Równoważna definicja: część płaszczyzny ograniczona przez pewien okrąg; okrąg ten zawiera się w kole i jest zarazem jego brzegiem.`,
          definitionSource: "matemaks.pl",
          modalImage: "granica.png",
          modalImageSource: "matemaks.pl"
        };
      };
      const data = await fetch(id);
      commit("modalUpdateDefinee", data.definee ?? "BŁĄD");
      commit("modalUpdateDefinition", data.definition ?? "BŁĄD");
      commit("modalUpdateDefinitionSource", data.definitionSource ?? null);
      commit("modalUpdateImage", `/img/definitions/${data.modalImage}` ?? null);
      commit("modalUpdateImageSource", data.modalImageSource ?? null);
    },
    async featuredUpdate({ commit }, id: string) {
      const fetchDefinition = async function(id: string) {
        return {
          definee: `Koło ${id}`,
          definition: `zbiór wszystkich punktów płaszczyzny, których odległość od ustalonego punktu na tej płaszczyźnie, nazywanego środkiem koła, jest mniejsza lub równa długości promienia koła.\n
          Równoważna definicja: część płaszczyzny ograniczona przez pewien okrąg; okrąg ten zawiera się w kole i jest zarazem jego brzegiem.`,
          endsAt: new Date()
        };
      };

      const data = await fetchDefinition(id);

      commit("featuredUpdateId", id);
      commit("featuredUpdateDefinee", data.definee);
      commit("feturedUpdateDefinition", data.definition);
      commit("feturedUpdateEndsAt", new Date());
    },
    openModal({ commit, dispatch }, id: string) {
      dispatch("modalUpdate", id).then(() =>
        commit("modalUpdateVisibility", true)
      );
    },
    closeModal({ commit }) {
      commit("modalUpdateVisibility", false);
    },
    carouselStartBlocking({ commit }) {
      commit("carouselUpdateBlock", true);
    },
    carouselStopBlocking({ commit }) {
      commit("carouselUpdateBlock", false);
    },
    startLearningSession({ commit }, sessionId: string) {
      sessionId;
      commit("updateFlashcardState", 0);
      console.log("a");
    },
    endLearningSession({ commit }) {
      commit;
      console.log("end");
    }
  }
});

// Define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key);
}
