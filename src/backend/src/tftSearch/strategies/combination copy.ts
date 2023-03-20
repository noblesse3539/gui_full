import { Combination } from "js-combinatorics";
import { Champion } from "../../../../shared/sharedInterfaces";
import Champions from "../../../data/tft/set5patch1115/champions.json";
import Traits from "../../../data/tft/set5patch1115/traits.json";

import { ISearchOption, ITftSearchStrategy } from "../../interfaces";

export class CombStrategy implements ITftSearchStrategy {
  /**
   * 챔피언들 중 championIds를 뺀 리스트에서 capacity - championIds.length 만큼을 선택하는 comb를 구한다.
   * comb에서 조건에 맞는 애들을 필터링
   * 우선순위대로 정렬. 우선순위를 못정했으므로 정렬은 일단 생략
   * 20번째까지 뽑아서 반환.
   */
  get(option: ISearchOption): Champion[][] {
    const { capacity, championIds, traitOpts } = option;
    const remainTraitOpts = traitOpts.map((to) => {
      const trait = Traits.find((trait) => trait.key === to.id);
      if (trait) {
        return { id: to.id, remain: trait.sets[to.setIdx].min };
      } else {
        return { id: to.id, remain: 99 };
      }
    });

    const essentialChampions = Champions.filter((champion) =>
      championIds.includes(champion.championId)
    );
    essentialChampions.forEach((eChampion) => {
      eChampion.traits.forEach((traitKey) => {
        const opt = remainTraitOpts.find(
          (traitOpt) => traitOpt.id === traitKey
        );
        if (opt) {
          opt.remain--;
        }
      });
    });

    const candiChampions = Champions.filter(
      (champion) => !championIds.includes(champion.championId)
    );

    const r = capacity - championIds.length;
    const comb = new Combination(candiChampions, r).toArray();
    const filteredComb = comb.filter((champions) => {
      const copyRemainTraitOpts = remainTraitOpts.map((traitOpt) => ({
        ...traitOpt,
      }));

      champions.forEach((champion) => {
        champion.traits.forEach((traitKey) => {
          const opt = copyRemainTraitOpts.find(
            (traitOpt) => traitOpt.id === traitKey
          );
          if (opt) {
            opt.remain--;
          }
        });
      });

      if (copyRemainTraitOpts.find((opt) => opt.remain > 0)) return false;

      return true;
    });

    const unionComb = filteredComb.map((champions) => [
      ...champions,
      ...essentialChampions,
    ]);

    // 우선순위 정렬은 지금은 생략함.

    return unionComb.slice(0, 20).map((champions) => {
      return champions.map((champion) => ({
        id: champion.championId,
        name: champion.name,
        cost: champion.cost,
      }));
    });
  }
}
