// store.ts
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import createPersistedState from "vuex-persistedstate";

import dayjs from "dayjs";

import {
  Card,
  Deck,
  UniResponse,
  LearningSession,
  Flashcard,
  DefinitionContent
} from "../../types/definitions.d";

export enum flashcardState {
  Think = 0,
  Rate,
  WillChange,
  NextFlashcard
}

function definitionIsEqual(a: Card | Deck, b: Card | Deck) {
  return a.id == b.id;
}

function sessionEquals(
  // eslint-disable-next-line prettier/prettier
  a: [categoryId: string, categoryLabel: string][],
  { categories: b }: LearningSession
) {
  if (a.length !== b.length) return false;
  return a.every((a, i) => a[0] === b[i][0]);
}

function sessionExists(
  savedSessions: Record<string, LearningSession>,
  newSession: LearningSession
) {
  // Map saved sessions
  const existingSessions = Object.values(savedSessions).map(session =>
    session.categories.map(category => category)
  );

  // Check if existingSessions contains exactly te same
  // elements as newSession
  return existingSessions.some(session => sessionEquals(session, newSession));
}

// eslint-disable-next-line
function shuffleArray(array: [...any]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

class Category {
  private _id = "";
  private _label = "";
  private _score = 0;
  private _cards: Record<string, number> = {};

  constructor(
    id: string,
    label: string,
    score?: number,
    cards?: Record<string, number>) {
      this._id = id;
      this._label = label;
      if (score) this._score = score;
      else this._score = 0;
      if (cards) this._cards = cards;
      else this._cards = {};
    }

  async init() {
    const deck: Deck = await
      (await fetch(`${process.env.VUE_APP_API_URL}/deck/${this._id}`))
      .json();
    
    deck.cards.flatMap(card => Object.assign(card, {value: 0}))
                                     .map(x => this._cards[x.id] = x.value);
  }

  static async create(id: string, label: string) {
    // console.log(`creating category instance with id ${id}`);
    const category = new Category(id, label);
    await category.init();
    return category;
  }

  static rehydrate(obj: {
    id: string,
    label: string,
    score: number,
    cards: Record<string, number>
  }) {
    // console.warn(`rehydrate called with obj:`, obj);
    // console.log(`rehydrated as: `, new Category(obj.id, obj.label, obj.score, obj.cards))
    return new Category(obj.id, obj.label, obj.score, obj.cards);
  }

  private calculateScore() {
    // score = (sum of all cards' scores) / (number of cards) / (max score = 4)
    this._score = Object.values(this._cards).reduce((acc, curr) => acc += curr)
                / (Object.values(this._cards).length) / 4;
    // round the score
    this._score = Math.round((this._score + Number.EPSILON) * 100) / 100 * 100;
  }

  get id() {
    return this._id;
  }

  get label() {
    return this._label;
  }

  get score() {
    this.calculateScore();
    return this._score;
  }

  get cards() {
    return this._cards;
  }

  set cards(input: Record<string, number>) {
    const [ [id, score] ] = Object.entries(input);
    // If current score is higher than previous score, persist current score
    this._cards[id] = this._cards[id] < score ? score : this._cards[id];
  }

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
      expires: number;
    };

    carousel: {
      blockModal: boolean;
    };
  };

  learn: {
    savedSessions: Record<string, LearningSession>;
    categoryProgress: Record<string, Category>;
    latestLearningSession: string;
  };

  flashcard: Flashcard

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
        expires: Date.now()
      },
      carousel: {
        blockModal: false
      }
    },

    learn: {
      savedSessions: {},
      categoryProgress: {},
      latestLearningSession: ""
    },

    flashcard: {
        id: "",

        definee: "",
        definition: [],
        definitionSource: "",

        state: 0,
        userChoice: 0
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
      content: DefinitionContent[]
    ) {
      store.homepage.featured.content.definition = content;
    },
    feturedUpdateDefinitionSource(store, s: string) {
      store.homepage.featured.content.definitionSource = s;
    },
    feturedUpdateExpires(store, n: number) {
      store.homepage.featured.expires = n;
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
      store.flashcard.state = s;
    },
    updateCurrentUserChoice(store, n: 0 | 1 | 2 | 3) {
      store.flashcard.userChoice = n;
    },

    // Learning sessions
    addLearningSession(
      store,
      data: { uuid: string; newSession: LearningSession }
    ) {
      // Sort to-insert array lexicographically
      data.newSession.categories.sort((a, b) => a[1].localeCompare(b[1]));

      // Check if this exact set already exists
      if (!sessionExists(store.learn.savedSessions, data.newSession)) {
        
        // Check categoryProgress has already been created
        // for this session's categories and if not create missing 
        data
        .newSession
        .categories
        .forEach(
          async category => {
          if (!store.learn.categoryProgress[category[0]]) {
            store.learn.categoryProgress[category[0]]
              = await Category.create(category[0], category[1]);
            // console.warn(`Progress for category "${category[1]}" has just been created`);
          }
          // else
            // console.warn(`Progress for category "${category[1]}" already exists`);
          
          Object.entries(store.learn
                              .categoryProgress[category[0]]
                              .cards)
                .forEach(card => data
                                 .newSession
                                 .futureBuckets[0]
                                 .push([card[0], category[0], card[1]]))
          }
        )

        // Finally, save the session at disclosed uuid
        store.learn.savedSessions[data.uuid] = data.newSession;
      }
    },
    deleteLearningSession(store, uuid: string) {
      delete store.learn.savedSessions[uuid];
    },
    shuffleQueue(state, id: string) {
      shuffleArray(state.learn.savedSessions[id].queue);
    },
    addFutureToQueue(store, id: string) {
      const currentTime = dayjs().unix();
      store.learn.savedSessions[id].mergeTime.forEach((time, index) => {
        const i = index as 0 | 1 | 2 | 3;
        if (currentTime > time) {
          store.learn.savedSessions[id].futureBuckets[i]
            .forEach(item => store.learn.savedSessions[id].queue.push(item));

          store.learn.savedSessions[id].futureBuckets[i] = [];
          
          store.learn.savedSessions[id].mergeTime[i] = dayjs().endOf("day").add(i, "day").unix();
        }
      })
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
      if (Date.now() > this.state.homepage.featured.expires)
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
      // Save latest learning session
      store.state.learn.latestLearningSession = sessionId;
      // Add to queue if mergeTime has expired
      commit("addFutureToQueue", sessionId);
      // Shuffle for more diversity
      commit("shuffleQueue", sessionId);
      // Reset the flashcard state in case it isn't zero
      commit("updateFlashcardState", 0);
    },
    saveLearningSession({ commit }, data: {
        uuid: string;
        categories: [id: string, label: string][]
      })
    {
      const newLearningSession: { uuid: string, newSession: LearningSession} = {
        uuid: data.uuid,
        newSession: {
          categories: data.categories,
          queue: [],
          futureBuckets: {
            0: [],
            1: [],
            2: [],
            3: []
          },
          mergeTime: [0, 0, 0, 0]
        }
      }
      // console.log(newLearningSession);

      commit("addLearningSession", newLearningSession);
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
      paths: ["homepage.featured", "latest", "learn", "saved.definitions"],
      getState: (key, storage) => {
        const savedState = JSON.parse(storage.getItem(key));

        if (!savedState) return {};

        const categoryProgress: Record<string, Category> = {};

        Object.entries(savedState.learn.categoryProgress)
              // eslint-disable-next-line
              .map((x: [string, any]) => categoryProgress[x[0]] = Category.rehydrate({
                id: x[1]._id,
                label: x[1]._label,
                score: x[1]._score,
                cards: x[1]._cards
              }));

        return {
          homepage: {
            featured: savedState.homepage.featured
          },
          latest: savedState.latest,
          learn: {
            categoryProgress: categoryProgress,
            savedSessions: savedState.learn.savedSessions
          },
          saved: savedState.saved
        }
      }
    }),
    // createLogger({
    //   transformer(state) {
    //     return state.flashcard
    //   }
    // })
  ]
});

// Define your own `useStore` composition function
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useStore() {
  return baseUseStore(key);
}
