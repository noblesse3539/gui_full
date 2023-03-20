import { atom, selector } from "recoil";
import {
  Champion,
  PlacedChampion,
  ResSearchResult,
} from "../../shared/sharedInterfaces";
import { TraitMap, CountedTrait } from "../interfaces";

export enum atomKeys {
  precondChampionListState,
  precondTraitListState,
  traitSetMapState,
  searchResultState,
  tabIdxState,
  unitCapState,
}
interface TodoList {
  id: number;
}

export const unitCapState = atom<number>({
  key: atomKeys[atomKeys.unitCapState],
  default: 8,
});
export const precondChampionListState = atom<Champion[]>({
  key: atomKeys[atomKeys.precondChampionListState],
  default: [],
});

export const traitMapState = atom<TraitMap>({
  key: atomKeys[atomKeys.traitSetMapState],
  default: {},
});

export const precondTraitListState = atom<string[]>({
  key: atomKeys[atomKeys.precondTraitListState],
  default: [],
});

// todo 서치리저트 스테이트와 필드에 배치된 챔피언 스테이트는 분리되어야함.
// 서치의 결과 하나를 클릭하면 배치 챔피언 스테이트가 세팅되어야하고, 챔피언을 끌어 옮겨도 배치 챔피언 스테이트가 세팅되어야함.
export const searchResultState = atom<ResSearchResult[]>({
  key: atomKeys[atomKeys.searchResultState],
  default: [],
});

export const tabIdxState = atom<number>({
  key: atomKeys[atomKeys.tabIdxState],
  default: 0,
});
/// 참고용
export const todoListState = atom<TodoList[]>({
  key: "todoListState",
  default: [],
});

export const todoListFilterState = atom({
  key: "todoListFilterState",
  default: "Show All", // Show Completed, Show Uncompleted
});

export const filteredTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case "Show Completed":
        return list.filter((item) => item.isComplete);
      case "Show Uncompleted":
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

export const todoListStatsState = selector({
  key: "todoListStatsState",
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});
