import { useState } from "react";
import { Trait } from "../../shared/sharedInterfaces";
import {
  InformationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/outline";
import { classNames } from "../utils";

type Props = {
  trait: Trait;
  checked: boolean;
  selectedSetIdx: number;
  onTraitCardChecked: (traitId: string) => void;
  onSetSelected: (traitId: string, selectedIdx: number) => void;
};
const initData: Trait = {
  id: "Set5_Assassin",
  name: "Assassin",
  description:
    "Assassins’ Abilities can critically strike and they gain bonus Critical Strike Chance and bonus Critical Strike Damage.",
  type: "class",
  sets: [
    {
      max: 3,
      min: 2,
      style: "bronze",
    },
    {
      max: 5,
      min: 4,
      style: "silver",
    },
    {
      max: 7,
      min: 6,
      style: "gold",
    },
    {
      min: 8,
      style: "chromatic",
    },
  ],
};

const TraitCard: React.FC<Props> = (props: Props) => {
  const {
    trait: data,
    checked,
    selectedSetIdx,
    onTraitCardChecked,
    onSetSelected,
  } = props;
  const [revealInfo, setRevealInfo] = useState(false);

  return (
    <>
      <div
        className={classNames(
          checked
            ? "border-teal-400 hover:border-teal-400"
            : "hover:border-teal-100",
          "flex flex-col rounded-lg border-2 hover:cursor-pointer "
        )}
      >
        <div className="flex my-1" onClick={() => onTraitCardChecked(data.id)}>
          <div className="basis-1/6 mx-2 my-auto">
            <CheckCircleIcon
              className={classNames(checked ? "stroke-teal-400" : "hidden")}
            />
          </div>
          <div className="basis-4/6 text-center my-auto">{data.name}</div>
          <div className="basis-1/6 mx-2 my-auto ">
            <InformationCircleIcon
              onMouseOver={() => setRevealInfo(true)}
              onMouseLeave={() => setRevealInfo(false)}
            />
            <div
              className={classNames(
                revealInfo
                  ? "border rounded-lg absolute break-words w-96 bg-slate-800 text-neutral-50 p-2"
                  : "hidden"
              )}
            >
              {data.description}
            </div>
          </div>
        </div>
        <div className="flex w-full">
          {data.sets.map((set, idx) => {
            return (
              <div
                className={classNames(
                  idx == selectedSetIdx
                    ? checked
                      ? "bg-orange-300 hover:bg-orange-300"
                      : "bg-gray-400"
                    : " ",
                  "flex-auto text-center border first:rounded-bl-md last:rounded-br-md hover:bg-orange-100"
                )}
                key={idx}
                onClick={() => {
                  if (!checked) {
                    onTraitCardChecked(data.id);
                  }
                  onSetSelected(data.id, idx);
                }}
              >
                {set.min}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TraitCard;
