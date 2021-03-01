// store.ts
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

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
  carousel: {
    blockModal: boolean;
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
    carousel: {
      blockModal: false
    }
  },
  mutations: {
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
      store.carousel.blockModal = b;
    }
  },
  actions: {
    async modalUpdate({ commit }, id: number) {
      const fetch = async function(id: number) {
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
    openModal({ commit }) {
      commit("modalUpdateVisibility", true);
    },
    closeModal({ commit }) {
      commit("modalUpdateVisibility", false);
    },
    carouselStartBlocking({ commit }) {
      commit("carouselUpdateBlock", true);
    },
    carouselStopBlocking({ commit }) {
      commit("carouselUpdateBlock", false);
    }
  }
});

// Define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key);
}
