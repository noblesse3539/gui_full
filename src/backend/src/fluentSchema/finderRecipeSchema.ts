import S from "fluent-json-schema";

const queryStringJsonSchema = S.object().prop(
  "level",
  S.integer().minimum(3).maximum(9).required()
);
// .prop(
//   "expecting_traits",
//   S.array()
//     .items(
//       S.object()
//         .prop("trait_id", S.string())
//         .required()
//         .prop("set", S.integer())
//         .required()
//     )
//     .required()
// )
// .prop("current_champions", S.array().items(S.string().required()).required())
// .prop("sort");

export const finderRecipeSchema = {
  querystring: queryStringJsonSchema,
};

// export const findRecipe = (
//   level: number,
//   synOpt: { synergyId: number; step: number }[],
//   sortOpt: SORT_OPTION
// ) => {
//   /**
//    * 챔피언들의 정렬은 레벨에 따라 1순위 확률 높은 2순위 코스트 높은 으로 정렬을 하자.(1: 고확률 순, 2: 고밸류 순)
//    * 정렬된 챔피언들 중 0인 확률들은 다 제외한다.(조합 수 줄이기 위함.)
//    * 정렬된 순으로 레벨에 따른 배치 수 만큼 조합을 뽑아내자
//    * 뽑았을 경우 원하는 시너지가 일치하는지 확인한다.
//    * 맞는 것을 리스트에 담는다.
//    * 시너지의 합이 가장 높은 순으로 정렬한다.
//    * 리스트에서 n번째 까지 리턴해준다.
//    */
//   const { slotCnt, level: lv } = userLvlStatus[level];
//   const sorted = sortedChamp(CHAMPIONS, lv, sortOpt);

//   const combi = combineWithoutRepetitions(sorted, slotCnt) as Champion[][];
//   const filterdBySyn = combi.filter((champs) => {
//     const synCounts = new Array(Object.keys(EnumSynergy).length / 2).fill(0);
//     console.assert(synCounts.length === 26, {
//       SynergyLength: synCounts.length,
//       errorMsg: "Object.keys(EnumSynergy).length didnt match.",
//     });

//     champs.forEach((champ) => {
//       const synList = champ.getSynergyList();
//       synList.forEach((synId) => synCounts[synId]++);
//     });

//     let synId, step;
//     for (let i = 0; i < synOpt.length; i++) {
//       synId = synOpt[i].synergyId;
//       step = synOpt[i].step;
//       if (synCounts[synId] < step) return false;
//     }

//     return true;
//   });

//   return filterdBySyn;
// };
