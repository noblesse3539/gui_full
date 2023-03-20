import { Champion } from "../../shared/sharedInterfaces";

export interface ITftSearch {
  strategy: ITftSearchStrategy;
}

export interface ITftSearchStrategy {
  get: (option: ISearchOption) => Champion[][];
}

export interface ISearchOption {
  capacity: number;
  championIds: string[];
  traitOpts: {
    id: string;
    setIdx: number;
  }[];
}
