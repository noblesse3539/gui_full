import { Trait } from "../../shared/sharedInterfaces";
import TraitCard from "./TraitCard";
import { useRecoilState } from "recoil";
import { precondTraitListState, traitMapState } from "../states/filterState";

interface Props {}
const TraitSelect: React.FC<Props> = (props: Props) => {
  const [traitMap, setTraitMap] = useRecoilState(traitMapState);
  const [precondTraitList, setPrecondTraitList] = useRecoilState(
    precondTraitListState
  );

  const onTraitCardChecked = (traitId: string) => {
    if (precondTraitList.includes(traitId)) {
      setPrecondTraitList(
        precondTraitList.filter((precondTraitId) => precondTraitId !== traitId)
      );
    } else {
      setPrecondTraitList([...precondTraitList, traitId]);
    }
  };

  const onTraitSetSelected = (traitId: string, selectedIdx: number) => {
    const oldTrait = traitMap[traitId];
    setTraitMap({
      ...traitMap,
      [traitId]: { ...oldTrait, traitSetIdx: selectedIdx },
    });
  };

  return (
    <div className="grid md:grid-cols-4 gap-3 sm:grid-cols-2 lg:grid-cols-5 ">
      {Object.keys(traitMap).map((key) => (
        <TraitCard
          key={`trait-card-${key}`}
          trait={traitMap[key]}
          checked={precondTraitList.includes(key)}
          selectedSetIdx={traitMap[key].traitSetIdx}
          onTraitCardChecked={onTraitCardChecked}
          onSetSelected={onTraitSetSelected}
        />
      ))}
    </div>
  );
};

export default TraitSelect;
