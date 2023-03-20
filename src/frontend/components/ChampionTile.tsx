import { PlusCircleIcon } from "@heroicons/react/solid";
import { useRecoilState } from "recoil";
import { Champion } from "../../shared/sharedInterfaces";
import { precondChampionListState } from "../states/filterState";
import { classNames } from "../utils";

interface Props {
  champions: Champion[];
  precondChampions: Champion[];
}
const ChampionTile: React.FC<Props> = (props: Props) => {
  const { champions } = props;
  const [precondChampions, setPrecondChampions] = useRecoilState(
    precondChampionListState
  );

  return (
    <div className="grid grid-cols-10 place-items-center">
      {champions.map((champion) => (
        <div key={champion.id} className="w-fit">
          <figure className="w-24">
            <PlusCircleIcon
              className={classNames(
                precondChampions.some((preCham) => {
                  return preCham.id == champion.id;
                })
                  ? ""
                  : "invisible",
                "ml-auto w-6 h-6 rotate-45 fill-red-500 -mb-4 mr-1"
              )}
              onClick={() => {
                setPrecondChampions(
                  precondChampions.filter((pch) => pch.id != champion.id)
                );
              }}
            />
            <img
              className="my-1 w-14 h-14  mx-auto rounded-md hover:border-2 hover:border-sky-600"
              src={`/champions/${champion.id}.png`}
              alt={champion.name}
              onClick={() => {
                if (
                  !precondChampions.find(
                    (precondChamp) => precondChamp.id === champion.id
                  )
                ) {
                  setPrecondChampions([...precondChampions, champion]);
                }
              }}
            ></img>
            <figcaption className="text-sm text-center ">
              {champion.name}
            </figcaption>
          </figure>
        </div>
      ))}
    </div>
  );
};

export default ChampionTile;
