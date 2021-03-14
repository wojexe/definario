export interface Card {
  id: string;
  definee: string;
  definition: Array<{
    type: "block-image" | "inline-image" | string;
    value: string;
  }>;
  definitionSource: string;
}

export interface Deck {
  categoryId: string;
  id: string;
  definee: string;
  definition: Array<{
    type: "block-image" | "inline-image" | string;
    value: string;
  }>;
  cards: Array<string>;
}

export interface SearchResponse {
  id: string;
  type: "card" | "deck" | string;
  title: string;
  content: string;
}

export interface UniResponse {
  type: "card" | "deck";
  data: Card | Deck;
}
