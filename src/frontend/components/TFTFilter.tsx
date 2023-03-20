import { useState } from "react";
import {
  AdjustmentsIcon,
  ChevronDoubleRightIcon,
  PlusCircleIcon,
} from "@heroicons/react/solid";
import { useRecoilState } from "recoil";
import {
  precondChampionListState,
  precondTraitListState,
  traitMapState,
  unitCapState,
} from "../states/filterState";
import { classNames } from "../utils";

const TFTFilter: React.FC = () => {
  const [unitCap, setUnitCap] = useRecoilState(unitCapState);
  const [precondChampions, setPrecondChampions] = useRecoilState(
    precondChampionListState
  );
  const [traitMap, setTraitMap] = useRecoilState(traitMapState);
  const [precondTraitList, setPrecondTraitList] = useRecoilState(
    precondTraitListState
  );

  return (
    <div className="h-full text-center flex flex-col gap-1 overflow-y-scroll">
      <label className="text-lg font-bold">Precondition</label>
      <div className="text-left px-3">
        <label className="text-sm ">Unit Cap</label>
        <div className="flex gap-3 ">
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={unitCap}
            onChange={(e) => setUnitCap(Number.parseInt(e.target.value))}
            className="w-full"
          />
          <label>{unitCap}</label>
        </div>
      </div>
      <div className="text-left px-3 grow min-h-[150px]">
        <div className="flex justify-between">
          <label className="text-sm">Champions</label>
          <button
            className={classNames(
              precondChampions.length > 0 ? "" : "invisible",
              "bg-indigo-400 rounded-lg px-2 text-white text-sm hover:bg-indigo-300 active:bg-indigo-500"
            )}
            onClick={() => setPrecondChampions([])}
          >
            Clear
          </button>
        </div>
        <div className="grid grid-cols-5 gap-2 place-items-center ">
          {precondChampions.map((precondChampion) => (
            <div
              key={`precondChampion-${precondChampion.id}`}
              className="w-fit"
            >
              <PlusCircleIcon
                className="ml-auto w-6 h-6 rotate-45 fill-red-500 -mb-3 -mr-4"
                onClick={() => {
                  setPrecondChampions(
                    precondChampions.filter(
                      (pch) => pch.id != precondChampion.id
                    )
                  );
                }}
              />
              <img
                src={`/champions/${precondChampion.id}.png`}
                alt={`${precondChampion.name}`}
                className="w-10 h-10 rounded-md mx-auto"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="text-left px-3 grow min-h-[100px]">
        <div className="w-full flex justify-between">
          <label className="text-sm">Traits</label>
          <button
            className={classNames(
              precondTraitList.length > 0 ? "" : "invisible",
              "bg-indigo-400 rounded-lg px-2 text-white text-sm hover:bg-indigo-300 active:bg-indigo-500"
            )}
            onClick={() => setPrecondTraitList([])}
          >
            Clear
          </button>
        </div>
        <div className="grid grid-cols-5 gap-2 place-items-center ">
          {precondTraitList.map((traitId) => (
            <div key={`precondTrait-${traitId}`} className="w-fit relative">
              <PlusCircleIcon
                className="ml-auto w-6 h-6 rotate-45 fill-red-500 -mb-3 -mr-4"
                onClick={() => {
                  setPrecondTraitList(
                    precondTraitList.filter(
                      (precontTraitId) => precontTraitId !== traitId
                    )
                  );
                }}
              />
              <img
                src={`/traits/${traitMap[traitId].name.toLowerCase()}.svg`}
                alt={`${traitMap[traitId].name}`}
                className="w-7 h-7 rounded-md mx-auto"
                onClick={() => {
                  const oldTrait = traitMap[traitId];
                  const setsLen = oldTrait.sets.length;
                  setTraitMap({
                    ...traitMap,
                    [traitId]: {
                      ...oldTrait,
                      traitSetIdx: (oldTrait.traitSetIdx + 1) % setsLen,
                    },
                  });
                }}
              />
              <div className="text-center">
                {traitMap[traitId].sets[traitMap[traitId].traitSetIdx].min}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TFTFilter;
