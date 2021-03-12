// store.ts
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import VuexPersistence from "vuex-persist";

import { DefinitionObject } from "../../types/definition.d";

enum flashcardState {
  Think = 0,
  Rate,
  WillChange,
  NextFlashcard
}

interface CurrentFlashcard extends DefinitionObject {
  id: string;
  state: flashcardState;
  userChoice: number;
  idScore: number;
}

function isEqual(b: string[], a: string[]) {
  for (const e of b) if (!a.includes(e)) return false;
  return true;
}

function exists(
  obj: Record<string, Array<{ id: string; label: string }>>,
  arr: Array<{ id: string; label: string }>
) {
  const sets = Object.values(obj).map(set => set.map(x => x.id));
  const newSet = arr.map(x => x.id);
  return sets.some(set => isEqual(set, newSet));
}

// Define your typings for the store state
export interface State {
  modal: {
    visible: boolean;

    content: DefinitionObject;
  };

  homepage: {
    featured: {
      content: DefinitionObject;
      endsAt: Date;
    };
    carousel: {
      blockModal: boolean;
    };
    lastVisited: Array<string>;
  };

  learn: {
    savedSessions: Record<string, Array<{ id: string; label: string }>>;
    progress: Array<{
      name: string;
      value: number;
    }>;
  };

  flashcards: {
    current: CurrentFlashcard;
  };

  saved: {
    definitions: Array<DefinitionObject>;
  };

  animated: {
    homepage: {
      carousel: boolean;
    };
    learn: {
      saved: boolean;
    };
    search: {
      results: boolean;
    };
    saved: {
      items: boolean;
    };
  };

  latest: Set<DefinitionObject>;
}

// Define injection key
export const key: InjectionKey<Store<State>> = Symbol();

// Persist some states
const vuexLocal = new VuexPersistence<State>({
  storage: window.localStorage,
  reducer: state => ({
    homepage: {
      featured: state.homepage.featured,
      lastVisited: state.homepage.lastVisited
    },
    learn: state.learn,
    // flashcards: {
    //   gameHistory: state.flashcards.gameHistory
    // },
    saved: state.saved,
    latest: state.latest
  })
});

export const store = createStore<State>({
  state: {
    modal: {
      visible: false,
      content: {
        id: "",
        definee: "",
        definition: [{ type: "", value: "" }],
        definitionSource: ""
      }
    },

    homepage: {
      featured: {
        content: {
          id: "",
          definee: "",
          definition: [{ type: "", value: "" }],
          definitionSource: ""
        },
        endsAt: new Date()
      },
      carousel: {
        blockModal: false
      },
      lastVisited: []
    },

    learn: {
      savedSessions: {},
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
      current: {
        id: "",

        state: flashcardState.Think,

        definee: "",
        definition: [{ type: "", value: "" }],
        definitionSource: "",

        idScore: 0,
        userChoice: 0
      }
    },

    saved: {
      definitions: [
        {
          id: "",
          definee: "",
          definition: [{ type: "", value: "" }],
          definitionSource: ""
        }
      ]
    },

    animated: {
      homepage: {
        carousel: false
      },
      learn: {
        saved: false
      },
      saved: {
        items: false
      },
      search: {
        results: false
      }
    },

    latest: new Set<DefinitionObject>().add({
      id: `21`,
      definee: `Koło 21`,
      definition: [
        {
          type: "block-image",
          value: "id.svg"
          // value:
          //   "koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło"
        },
        {
          type: "string",
          value:
            "koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło"
        },
        {
          type: "inline-image",
          value: "long.svg"
        },
        {
          type: "string",
          value: "koło koło koło koło koło"
        }
      ],
      definitionSource: "matemaks.pl"
    })
  },
  mutations: {
    // Featured
    featuredUpdateId(store, id: string) {
      store.homepage.featured.content.id = id;
    },
    featuredUpdateDefinee(store, s: string) {
      store.homepage.featured.content.definee = s;
    },
    feturedUpdateDefinition(
      store,
      content: Array<{ type: string; value: string }>
    ) {
      store.homepage.featured.content.definition = content;
    },
    feturedUpdateDefinitionSource(store, s: string) {
      store.homepage.featured.content.definitionSource = s;
    },
    feturedUpdateEndsAt(store, s: Date) {
      store.homepage.featured.endsAt = s;
    },

    // Modal
    modalUpdateVisibility(store, b: boolean) {
      store.modal.visible = b;
    },
    modalUpdateDefinee(store, s: string) {
      store.modal.content.definee = s;
    },
    modalUpdateDefinition(
      store,
      content: Array<{ type: string; value: string }>
    ) {
      store.modal.content.definition = content;
    },
    modalUpdateDefinitionSource(store, s: string) {
      store.modal.content.definitionSource = s;
    },

    // Carousel
    updateCarouselBlock(store, b: boolean) {
      store.homepage.carousel.blockModal = b;
    },
    updateLastVisited(store, n: string) {
      store.homepage.lastVisited.unshift(n);
    },

    // Animations - once
    updateAnimatedHomepageCarousel(store) {
      store.animated.homepage.carousel = true;
    },
    updateAnimatedLearnSaved(store) {
      store.animated.learn.saved = true;
    },

    // Flashcards
    updateFlashcardState(store, s: flashcardState) {
      store.flashcards.current.state = s;
    },
    updateCurrentUserChoice(store, n: number) {
      store.flashcards.current.userChoice = n;
    },

    // Learning sessions
    addLearningSession(
      store,
      s: { uuid: string; arr: Array<{ id: string; label: string }> }
    ) {
      console.log(store.learn.savedSessions);
      if (!exists(store.learn.savedSessions, s.arr)) {
        store.learn.savedSessions[s.uuid] = s.arr;
      }
    },
    deleteLearningSession(store, uuid: string) {
      delete store.learn.savedSessions[uuid];
    },

    // Latest session
    pushLatest(store: State, d: DefinitionObject) {
      // store.latest.add(d);
      d;
      console.log(store.latest);
    }
  },
  actions: {
    // Initial data fetch
    async initialFetch({ commit }) {
      const data = await (await fetch(`/definitions/manif.json`))
        .json()
        .catch(err => {
          console.log(err);
          throw Error(err);
        });
      data;
      commit;
    },

    // Modal
    openModal({ commit, dispatch }, id: string) {
      dispatch("modalUpdate", id).then(() =>
        commit("modalUpdateVisibility", true)
      );
    },
    closeModal({ commit }) {
      commit("modalUpdateVisibility", false);
    },
    async modalUpdate({ commit }, id: string) {
      const fetch = async function(id: string) {
        return {
          id: `2115`,
          definee: `Koło ${id}`,
          definition: [
            {
              type: "block-image",
              value: "id.svg"
              // value:
              //   "koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło"
            },
            {
              type: "string",
              value:
                "koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło"
            },
            {
              type: "inline-image",
              value: "long.svg"
            },
            {
              type: "string",
              value: "koło koło koło koło koło"
            }
          ],
          definitionSource: "matemaks.pl"
        };
      };
      const data = await fetch(id);
      commit("pushLatest", data);
      commit("modalUpdateDefinee", data.definee ?? "BŁĄD");
      commit("modalUpdateDefinition", data.definition ?? "BŁĄD");
      commit("modalUpdateDefinitionSource", data.definitionSource ?? null);
    },

    // Homepage featured
    async featuredUpdate({ commit }, id: string) {
      const fetch = async function(id: string) {
        return {
          id: `2115`,
          definee: `Koło ${id}`,
          definition: [
            {
              type: "block-image",
              value: "id.svg"
              // value:
              //   "koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło"
            },
            {
              type: "string",
              value:
                "koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło koło"
            },
            {
              type: "inline-image",
              value: "long.svg"
            },
            {
              type: "string",
              value: "koło koło koło koło koło"
            }
          ],
          definitionSource: "matemaks.pl"
        };
      };

      const data = await fetch(id);

      commit("featuredUpdateId", id);
      commit("featuredUpdateDefinee", data.definee);
      commit("feturedUpdateDefinition", data.definition);
      commit("feturedUpdateDefinitionSource", data.definitionSource);
      commit("feturedUpdateEndsAt", new Date().setHours(23, 59, 59, 999));
    },

    // Carousel
    carouselStartBlocking({ commit }) {
      commit("updateCarouselBlock", true);
    },
    carouselStopBlocking({ commit }) {
      commit("updateCarouselBlock", false);
    },

    // Flashcards
    startLearningSession({ commit }, sessionId: string) {
      sessionId;
      commit("updateFlashcardState", 0);
    },
    endLearningSession({ commit }) {
      commit;
      console.log("end");
    },
    saveLearningSession({ commit }, s: { uuid: string; arr: string[] }) {
      commit("addLearningSession", s);
    },
    deleteLearningSession({ commit }, uuid: string) {
      commit("deleteLearningSession", uuid);
    }
  },
  plugins: [vuexLocal.plugin]
});

// Define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key);
}
