// store.ts
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import createPersistedState from "vuex-persistedstate";

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

function definitionIsEqual(a: DefinitionObject, b: DefinitionObject) {
  return a.id == b.id;
}

function sessionEquals(
  a: Array<{ id: string; label: string }>,
  b: Array<{ id: string; label: string }>
) {
  if (a.length !== b.length) return false;
  return a.every((a, i) => a.id === b[i].id);
}

function sessionExists(
  savedSessions: Record<string, Array<{ id: string; label: string }>>,
  newSession: Array<{ id: string; label: string }>
) {
  // Map saved sessions
  const existingSessions = Object.values(savedSessions).map(session =>
    session.map(categories => categories)
  );

  // Check if existingSessions contains exactly te same
  // elements as newSession
  return existingSessions.some(session => sessionEquals(session, newSession));
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

  latest: Array<DefinitionObject>;
}

// Define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    modal: {
      visible: false,
      content: {
        id: "",
        definee: "",
        definition: [],
        definitionSource: ""
      }
    },

    homepage: {
      featured: {
        content: {
          id: "",
          definee: "",
          definition: [],
          definitionSource: ""
        },
        endsAt: new Date()
      },
      carousel: {
        blockModal: false
      }
    },

    learn: {
      savedSessions: {},
      progress: []
    },

    flashcards: {
      current: {
        id: "",

        state: flashcardState.Think,

        definee: "",
        definition: [],
        definitionSource: "",

        idScore: 0,
        userChoice: 0
      }
    },

    saved: {
      definitions: []
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

    latest: []
  },
  /*




  */
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
    modalUpdateData(store, d: DefinitionObject) {
      store.modal.content = d;
    },
    // modalUpdateDefinee(store, s: string) {
    //   store.modal.content.definee = s;
    // },
    // modalUpdateDefinition(
    //   store,
    //   content: Array<{ type: string; value: string }>
    // ) {
    //   store.modal.content.definition = content;
    // },
    // modalUpdateDefinitionSource(state, s: string) {
    //   state.modal.content.definitionSource = s;
    // },
    modalSaveDefinition(state) {
      console.log(state.modal.content, state.saved.definitions);
      state.saved.definitions = state.saved.definitions.filter(
        el => !definitionIsEqual(el, state.modal.content)
      );
      state.saved.definitions.unshift(state.modal.content);
    },

    // Carousel
    updateCarouselBlock(store, b: boolean) {
      store.homepage.carousel.blockModal = b;
    },

    // Animations - once
    updateAnimatedHomepageCarousel(store) {
      store.animated.homepage.carousel = true;
    },
    updateAnimatedLearnSaved(store) {
      store.animated.learn.saved = true;
    },
    updateAnimatedSaved(store) {
      store.animated.saved.items = true;
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
      // Sort to-insert array lexicographically
      s.arr.sort((a, b) => a.label.localeCompare(b.label));

      // Check if this exact set already exists
      if (!sessionExists(store.learn.savedSessions, s.arr)) {
        store.learn.savedSessions[s.uuid] = s.arr;
      }
    },
    deleteLearningSession(store, uuid: string) {
      delete store.learn.savedSessions[uuid];
    },

    // Latest session
    pushLatest(state, d: DefinitionObject) {
      state.latest = state.latest.filter(el => !definitionIsEqual(el, d));
      state.latest.unshift(d);
      if (state.latest.length > 20) state.latest.splice(20);
    },

    // Delete item from saved
    deleteSavedItem(state, id: string) {
      console.log(id);
      console.log(state.saved.definitions);
      state.saved.definitions = state.saved.definitions.filter(
        el => el.id !== id
      );
    }
  },
  /*




  */
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
          id: id,
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
              value: "koło koło koło koło"
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
      const data: DefinitionObject = await fetch(id);
      commit("pushLatest", data);
      commit("modalUpdateData", data);
      // commit("modalUpdateId", data.id ?? "BŁĄD");
      // commit("modalUpdateDefinee", data.definee ?? "BŁĄD");
      // commit("modalUpdateDefinition", data.definition ?? "BŁĄD");
      // commit("modalUpdateDefinitionSource", data.definitionSource ?? null);
    },
    saveDefinition({ commit }) {
      commit("modalSaveDefinition");
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
    },

    // Saved
    deleteSavedDefinition({ commit }, id: string) {
      commit("deleteSavedItem", id);
    }
  },
  plugins: [
    createPersistedState({
      paths: ["homepage.featured", "latest", "learn", "saved.definitions"]
    })
  ]
});

// Define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key);
}
