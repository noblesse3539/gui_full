export interface ResCategories {
  Champions: TabCategory<Champion[]>;
  Traits: TabCategory<Trait[]>;
  "Search Results": TabCategory<ResSearchResult[]>;
}

export interface ResSearchResult {
  placedChampions: PlacedChampion[];
  activeTraits: ActiveTrait[];
}
export interface Champion {
  id: string;
  name: string;
  cost: number;
}

export interface PlacedChampion extends Champion {
  row?: number;
  col?: number;
}

export interface ActiveTrait extends Trait {
  activeSetIdx: number;
  activeChmapions: string[];
}

export interface Trait {
  id: string;
  name: string;
  description: string;
  type: string;
  sets: TraitSet[];
}

export interface TabCategory<T> {
  panelType: PanelType;
  data: T;
}

export enum PanelType {
  CHAMPION_PANEL,
  TRAIT_PANEL,
  RESULT_PANEL,
}

export interface TraitSet {
  max?: number;
  min: number;
  style: string;
}

export interface ReqSearchQuery {
  capacity: number;
  championIds: string[];
  traitOpts: { id: string; setIdx: number }[];
}
