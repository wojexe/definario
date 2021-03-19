export interface DefinitionContent {
  type: "block-image" | "inline-image" | "string";
  value: string;
  inlineSize: "fraction" | "exponent" | "basic";
}

export interface Card {
  id: string;
  definee: string;
  definition: DefinitionContent[];
  definitionSource: string;
}

export interface Flashcard extends Card {
  state: number;
  userChoice: 0 | 1 | 2 | 3;
}

export interface Deck {
  categoryId: string;
  id: string;
  definee: string;
  definition: DefinitionContent[];
  cards: Array<{ id: string }>;
}

export interface LearningSession {
  // eslint-disable-next-line prettier/prettier
  categories: [categoryId: string, categoryLabel: string][];
  queue: [cardId: string, categoryId: string, previousBucket: number][];
  // Represents buckets that will get merged after midnight
  futureBuckets: {
    0: [cardId: string, categoryId: string, previousBucket: number][];
    1: [cardId: string, categoryId: string, previousBucket: number][];
    2: [cardId: string, categoryId: string, previousBucket: number][];
    3: [cardId: string, categoryId: string, previousBucket: number][];
  }
  // Merge time of buckets // INDEX ARRAY
  mergeTime: [number, number, number, number];
}

export interface SearchResponse {
  id: string;
  type: "card" | "deck";
  title: string;
  content: DefinitionContent[];
  source?: string;
}

export interface UniResponse {
  type: "card" | "deck";
  data: Card | Deck;
}
