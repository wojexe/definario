// store.ts
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import createPersistedState from "vuex-persistedstate";

import { Card, Deck, UniResponse } from "../../types/definitions.d";

enum flashcardState {
  Think = 0,
  Rate,
  WillChange,
  NextFlashcard
}

interface CurrentFlashcard extends Card {
  id: string;
  state: flashcardState;
  userChoice: number;
  idScore: number;
}

function definitionIsEqual(a: Card | Deck, b: Card | Deck) {
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

    content: Card | Deck;
  };

  homepage: {
    featured: {
      content: Card;
      expires: Date;
    };

    carousel: {
      blockModal: boolean;
    };
  };

  learn: {
    savedSessions: Record<string, Array<{ id: string; label: string }>>;
    progress: Array<{
      id: string;
      name: string;
      value: number;
    }>;
  };

  flashcards: {
    current: CurrentFlashcard;
  };

  saved: {
    definitions: Array<Card | Deck>;
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

  latest: Array<Card | Deck>;
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
        expires: new Date()
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
    feturedUpdateExpires(store, s: Date) {
      store.homepage.featured.expires = s;
    },

    // Modal
    modalUpdateVisibility(store, b: boolean) {
      store.modal.visible = b;
    },
    modalUpdateData(store, d: Card | Deck) {
      store.modal.content = d;
    },
    modalSaveDefinition(state) {
      // console.log(state.modal.content, state.saved.definitions);
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
    pushLatest(state, d: Card | Deck) {
      state.latest = state.latest.filter(el => !definitionIsEqual(el, d));
      state.latest.unshift(d);
      if (state.latest.length > 20) state.latest.splice(20);
    },

    // Delete item from saved
    deleteSavedItem(state, id: string) {
      // console.log(id);
      // console.log(state.saved.definitions);
      state.saved.definitions = state.saved.definitions.filter(
        el => el.id !== id
      );
    }
  },
  /*




  */
  actions: {
    // Initial data fetch
    async initialFetch({ dispatch }) {
      if (new Date() > this.state.homepage.featured.expires)
        dispatch("featuredUpdate");
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
      const res: { data: UniResponse } = await (
        await fetch(`${process.env.VUE_APP_API_URL}/uni/${id}`)
      ).json();

      commit("pushLatest", res.data);
      commit("modalUpdateData", res.data);
    },
    saveDefinition({ commit }) {
      commit("modalSaveDefinition");
    },

    // Homepage featured
    async featuredUpdate({ commit }) {
      const res: Card = await (
        await fetch(`${process.env.VUE_APP_API_URL}/featured`)
      ).json();

      // console.log(res);

      commit("featuredUpdateId", res.id);
      commit("featuredUpdateDefinee", res.definee);
      commit("feturedUpdateDefinition", res.definition);
      commit("feturedUpdateDefinitionSource", res.definitionSource);
      commit("feturedUpdateExpires", new Date().setHours(23, 59, 59, 999));
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
      // console.log("end");
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
