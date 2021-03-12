export interface DefinitionObject {
  id: string;
  definee: string;
  definition: Array<{
    type: "block-image" | "inline-image" | string;
    value: string;
  }>;
  definitionSource: string;
}
