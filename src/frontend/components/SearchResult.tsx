import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { searchResultState } from "../states/filterState";
import { classNames } from "../utils";

interface Props {}
const SearchResult: React.FC<Props> = (props: Props) => {
  const [searchResult] = useRecoilState(searchResultState);

  return (
    <div>
      {searchResult.map((resultItem, i) => {
        return (
          <div
            key={`search-result-${i}`}
            className="flex border-2 rounded-md mb-3"
          >
            <div className="text-lg text-center my-auto mr-2">Set {i}</div>
            <div className="flex flex-wrap mb-3 w-1/2 my-auto">
              {resultItem.placedChampions.map((placedChampion, j) => {
                return (
                  <img
                    key={`placed_champion_${j}`}
                    className="my-1 w-14 h-14  mx-auto rounded-md "
                    src={`/champions/${placedChampion.id}.png`}
                    alt={placedChampion.name}
                  ></img>
                );
              })}
            </div>

            <div className="flex flex-wrap mb-3 w-30 my-auto">
              {resultItem.activeTraits.map((activeTrait, j) => {
                return (
                  <div key={`active-${activeTrait.id}`} className="mx-1">
                    <img
                      src={`/traits/${activeTrait.name.toLowerCase()}.svg`}
                      alt={`${activeTrait.name}`}
                      className="w-7 h-7 rounded-md mx-auto"
                    />
                    <div className="text-center">
                      {activeTrait.sets[activeTrait.activeSetIdx].min}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResult;
