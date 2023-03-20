import { ActiveTrait, Champion } from "../../../shared/sharedInterfaces";
import { ITftSearch, ITftSearchStrategy } from "../interfaces";
import Traits from "../../data/tft/set5patch1115/traits.json";
import Champions from "../../data/tft/set5patch1115/champions.json";

export default class TftSearch implements ITftSearch {
  strategy: ITftSearchStrategy;

  constructor(strategy: ITftSearchStrategy) {
    this.strategy = strategy;
  }

  async get(option: any) {
    return this.strategy.get(option);
  }
}

export const getActiveTrait = (champions: Champion[]) => {
  const traitCountMap: {
    [traitKey: string]: { cnt: number; champions: string[] };
  } = {};
  champions.forEach((champion) => {
    Champions.find((ch) => (ch.championId = champion.id))?.traits.forEach(
      (traitKey) => {
        traitCountMap[traitKey]
          ? traitCountMap[traitKey].cnt++
          : (traitCountMap[traitKey].cnt = 1);
      }
    );
  });
  const result = [] as ActiveTrait[];

  Object.keys(traitCountMap).map((traitKey) => {
    let setIdx = -1;
    const trait = Traits.find((trait) => trait.key === traitKey);
    if (trait) {
      trait.sets.forEach((set, i) => {
        if (set.min <= traitCountMap[traitKey].cnt) {
          setIdx = i;
        }
      });
      if (setIdx >= 0) {
        result.push({
          id: trait.key,
          name: trait.name,
          description: trait.description,
          type: trait.type,
          sets: trait.sets,
          activeSetIdx: setIdx,
          activeChmapions: traitCountMap[traitKey].champions,
        });
      }
    }
  });

  return result;
};
