import { ReactElement, useEffect } from "react";
import Layout from "../components/Layout";
import { NextPageWithLayout, TraitMap, TraitSetMap } from "../interfaces";
import Header from "../components/Header";
import Field from "../components/Field";
import Tabs from "../components/Tabs";
import TFTFilter from "../components/TFTFilter";
import { GetServerSideProps } from "next";
import { getCategories, getSearch } from "../requestHandler";
import { ResCategories } from "../../shared/sharedInterfaces";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  precondChampionListState,
  precondTraitListState,
  searchResultState,
  tabIdxState,
  traitMapState,
  unitCapState,
} from "../states/filterState";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  categories: ResCategories;
}

const TftFinder: NextPageWithLayout<Props> = (props: Props) => {
  const { categories } = props;
  const [traitMap, setTraitMap] = useRecoilState(traitMapState);
  const [, setSearchResult] = useRecoilState(searchResultState);
  const [, setTabIdx] = useRecoilState(tabIdxState);
  const unitCap = useRecoilValue(unitCapState);
  const precondChampionList = useRecoilValue(precondChampionListState);
  const precondTraitList = useRecoilValue(precondTraitListState);

  useEffect(() => {
    const traits = categories.Traits.data;
    const newTraitMap: TraitMap = {};
    traits.forEach(
      (trait) => (newTraitMap[trait.id] = { ...trait, traitSetIdx: 0 })
    );

    setTraitMap(newTraitMap);
  }, [categories]);

  const onClickSearch = async () => {
    setTabIdx(2);

    const championsIds = precondChampionList.map((champion) => champion.id);
    const traitOpts = precondTraitList.map((traitId) => {
      return { id: traitId, setIdx: traitMap[traitId].traitSetIdx };
    });

    const res = await getSearch({
      capacity: unitCap,
      championIds: championsIds,
      traitOpts: traitOpts,
    });

    setSearchResult(res.data);
  };

  const onClickSearchTmp = () => {
    setTabIdx(2);
    setSearchResult([
      {
        activeTraits: [
          {
            id: "Set5_Victorious",
            name: "Victorious",
            description:
              "When Victorious champions score a kill, their next attack is empowered to deal a percentage of the target's missing Health as bonus magic damage.",
            type: "origin",
            sets: [
              {
                style: "gold",
                min: 1,
              },
            ],
            activeChmapions: ["TFT5_Garen"],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Dawnbringer",
            name: "Dawnbringer",
            description:
              "Dawnbringers rapidly heal some of their maximum Health the first time they drop below a percentage of their Health. When this occurs, all allied Dawnbringers gain bonus damage.",
            type: "origin",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "silver",
                min: 4,
                max: 5,
              },
              {
                style: "gold",
                min: 6,
                max: 7,
              },
              {
                style: "chromatic",
                min: 8,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Nightbringer",
            name: "Nightbringer",
            description:
              "Nightbringers gain a shield for several seconds equal to a percent of their maximum Health the first time they drop below a percentage of their maximum Health. When this occurs, that Nightbringer gains bonus damage.",
            type: "origin",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "silver",
                min: 4,
                max: 5,
              },
              {
                style: "silver",
                min: 6,
                max: 7,
              },
              {
                style: "gold",
                min: 8,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Knight",
            name: "Knight",
            description:
              "All allies block a flat amount of damage from all sources.",
            type: "class",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "silver",
                min: 4,
                max: 5,
              },
              {
                style: "gold",
                min: 6,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Ranger",
            name: "Ranger",
            description:
              "Rangers gain and lose bonus Attack Speed periodically. This effect begins after a delay after combat starts.",
            type: "class",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "gold",
                min: 4,
                max: 5,
              },
              {
                style: "chromatic",
                min: 6,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
        ],
        placedChampions: [
          {
            id: "TFT5_Aphelios",
            name: "Aphelios",
            cost: 4,
            row: 0,
            col: 0,
          },
          {
            id: "TFT5_Brand",
            name: "Brand",
            cost: 2,
            row: 0,
            col: 1,
          },
          {
            id: "TFT5_Draven",
            name: "Draven",
            cost: 4,
            row: 0,
            col: 2,
          },
          {
            id: "TFT5_Akshan",
            name: "Akshan",
            cost: 5,
            row: 0,
            col: 3,
          },
          {
            id: "TFT5_Diana",
            name: "Diana",
            cost: 4,
            row: 0,
            col: 4,
          },
          {
            id: "TFT5_Galio",
            name: "Galio",
            cost: 4,
            row: 1,
            col: 0,
          },
          {
            id: "TFT5_Garen",
            name: "Garen",
            cost: 5,
            row: 1,
            col: 1,
          },
          {
            id: "TFT5_Gragas",
            name: "Gragas",
            cost: 1,
            row: 1,
            col: 2,
          },
        ],
      },
      {
        activeTraits: [
          {
            id: "Set5_Victorious",
            name: "Victorious",
            description:
              "When Victorious champions score a kill, their next attack is empowered to deal a percentage of the target's missing Health as bonus magic damage.",
            type: "origin",
            sets: [
              {
                style: "gold",
                min: 1,
              },
            ],
            activeChmapions: ["TFT5_Garen"],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Dawnbringer",
            name: "Dawnbringer",
            description:
              "Dawnbringers rapidly heal some of their maximum Health the first time they drop below a percentage of their Health. When this occurs, all allied Dawnbringers gain bonus damage.",
            type: "origin",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "silver",
                min: 4,
                max: 5,
              },
              {
                style: "gold",
                min: 6,
                max: 7,
              },
              {
                style: "chromatic",
                min: 8,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Nightbringer",
            name: "Nightbringer",
            description:
              "Nightbringers gain a shield for several seconds equal to a percent of their maximum Health the first time they drop below a percentage of their maximum Health. When this occurs, that Nightbringer gains bonus damage.",
            type: "origin",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "silver",
                min: 4,
                max: 5,
              },
              {
                style: "silver",
                min: 6,
                max: 7,
              },
              {
                style: "gold",
                min: 8,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Knight",
            name: "Knight",
            description:
              "All allies block a flat amount of damage from all sources.",
            type: "class",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "silver",
                min: 4,
                max: 5,
              },
              {
                style: "gold",
                min: 6,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Ranger",
            name: "Ranger",
            description:
              "Rangers gain and lose bonus Attack Speed periodically. This effect begins after a delay after combat starts.",
            type: "class",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "gold",
                min: 4,
                max: 5,
              },
              {
                style: "chromatic",
                min: 6,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
        ],
        placedChampions: [
          {
            id: "TFT5_Aphelios",
            name: "Aphelios",
            cost: 4,
            row: 0,
            col: 0,
          },
          {
            id: "TFT5_Brand",
            name: "Brand",
            cost: 2,
            row: 0,
            col: 1,
          },
          {
            id: "TFT5_Draven",
            name: "Draven",
            cost: 4,
            row: 0,
            col: 2,
          },
          {
            id: "TFT5_Akshan",
            name: "Akshan",
            cost: 5,
            row: 0,
            col: 3,
          },
          {
            id: "TFT5_Diana",
            name: "Diana",
            cost: 4,
            row: 0,
            col: 4,
          },
          {
            id: "TFT5_Galio",
            name: "Galio",
            cost: 4,
            row: 1,
            col: 0,
          },
          {
            id: "TFT5_Garen",
            name: "Garen",
            cost: 5,
            row: 1,
            col: 1,
          },
          {
            id: "TFT5_Gragas",
            name: "Gragas",
            cost: 1,
            row: 1,
            col: 2,
          },
        ],
      },
      {
        activeTraits: [
          {
            id: "Set5_Victorious",
            name: "Victorious",
            description:
              "When Victorious champions score a kill, their next attack is empowered to deal a percentage of the target's missing Health as bonus magic damage.",
            type: "origin",
            sets: [
              {
                style: "gold",
                min: 1,
              },
            ],
            activeChmapions: ["TFT5_Garen"],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Dawnbringer",
            name: "Dawnbringer",
            description:
              "Dawnbringers rapidly heal some of their maximum Health the first time they drop below a percentage of their Health. When this occurs, all allied Dawnbringers gain bonus damage.",
            type: "origin",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "silver",
                min: 4,
                max: 5,
              },
              {
                style: "gold",
                min: 6,
                max: 7,
              },
              {
                style: "chromatic",
                min: 8,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Nightbringer",
            name: "Nightbringer",
            description:
              "Nightbringers gain a shield for several seconds equal to a percent of their maximum Health the first time they drop below a percentage of their maximum Health. When this occurs, that Nightbringer gains bonus damage.",
            type: "origin",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "silver",
                min: 4,
                max: 5,
              },
              {
                style: "silver",
                min: 6,
                max: 7,
              },
              {
                style: "gold",
                min: 8,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Knight",
            name: "Knight",
            description:
              "All allies block a flat amount of damage from all sources.",
            type: "class",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "silver",
                min: 4,
                max: 5,
              },
              {
                style: "gold",
                min: 6,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Ranger",
            name: "Ranger",
            description:
              "Rangers gain and lose bonus Attack Speed periodically. This effect begins after a delay after combat starts.",
            type: "class",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "gold",
                min: 4,
                max: 5,
              },
              {
                style: "chromatic",
                min: 6,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
        ],
        placedChampions: [
          {
            id: "TFT5_Aphelios",
            name: "Aphelios",
            cost: 4,
            row: 0,
            col: 0,
          },
          {
            id: "TFT5_Brand",
            name: "Brand",
            cost: 2,
            row: 0,
            col: 1,
          },
          {
            id: "TFT5_Draven",
            name: "Draven",
            cost: 4,
            row: 0,
            col: 2,
          },
          {
            id: "TFT5_Akshan",
            name: "Akshan",
            cost: 5,
            row: 0,
            col: 3,
          },
          {
            id: "TFT5_Diana",
            name: "Diana",
            cost: 4,
            row: 0,
            col: 4,
          },
          {
            id: "TFT5_Galio",
            name: "Galio",
            cost: 4,
            row: 1,
            col: 0,
          },
          {
            id: "TFT5_Garen",
            name: "Garen",
            cost: 5,
            row: 1,
            col: 1,
          },
          {
            id: "TFT5_Gragas",
            name: "Gragas",
            cost: 1,
            row: 1,
            col: 2,
          },
        ],
      },
      {
        activeTraits: [
          {
            id: "Set5_Victorious",
            name: "Victorious",
            description:
              "When Victorious champions score a kill, their next attack is empowered to deal a percentage of the target's missing Health as bonus magic damage.",
            type: "origin",
            sets: [
              {
                style: "gold",
                min: 1,
              },
            ],
            activeChmapions: ["TFT5_Garen"],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Dawnbringer",
            name: "Dawnbringer",
            description:
              "Dawnbringers rapidly heal some of their maximum Health the first time they drop below a percentage of their Health. When this occurs, all allied Dawnbringers gain bonus damage.",
            type: "origin",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "silver",
                min: 4,
                max: 5,
              },
              {
                style: "gold",
                min: 6,
                max: 7,
              },
              {
                style: "chromatic",
                min: 8,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Nightbringer",
            name: "Nightbringer",
            description:
              "Nightbringers gain a shield for several seconds equal to a percent of their maximum Health the first time they drop below a percentage of their maximum Health. When this occurs, that Nightbringer gains bonus damage.",
            type: "origin",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "silver",
                min: 4,
                max: 5,
              },
              {
                style: "silver",
                min: 6,
                max: 7,
              },
              {
                style: "gold",
                min: 8,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Knight",
            name: "Knight",
            description:
              "All allies block a flat amount of damage from all sources.",
            type: "class",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "silver",
                min: 4,
                max: 5,
              },
              {
                style: "gold",
                min: 6,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Ranger",
            name: "Ranger",
            description:
              "Rangers gain and lose bonus Attack Speed periodically. This effect begins after a delay after combat starts.",
            type: "class",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "gold",
                min: 4,
                max: 5,
              },
              {
                style: "chromatic",
                min: 6,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
        ],
        placedChampions: [
          {
            id: "TFT5_Aphelios",
            name: "Aphelios",
            cost: 4,
            row: 0,
            col: 0,
          },
          {
            id: "TFT5_Brand",
            name: "Brand",
            cost: 2,
            row: 0,
            col: 1,
          },
          {
            id: "TFT5_Draven",
            name: "Draven",
            cost: 4,
            row: 0,
            col: 2,
          },
          {
            id: "TFT5_Akshan",
            name: "Akshan",
            cost: 5,
            row: 0,
            col: 3,
          },
          {
            id: "TFT5_Diana",
            name: "Diana",
            cost: 4,
            row: 0,
            col: 4,
          },
          {
            id: "TFT5_Galio",
            name: "Galio",
            cost: 4,
            row: 1,
            col: 0,
          },
          {
            id: "TFT5_Garen",
            name: "Garen",
            cost: 5,
            row: 1,
            col: 1,
          },
          {
            id: "TFT5_Gragas",
            name: "Gragas",
            cost: 1,
            row: 1,
            col: 2,
          },
        ],
      },
      {
        activeTraits: [
          {
            id: "Set5_Victorious",
            name: "Victorious",
            description:
              "When Victorious champions score a kill, their next attack is empowered to deal a percentage of the target's missing Health as bonus magic damage.",
            type: "origin",
            sets: [
              {
                style: "gold",
                min: 1,
              },
            ],
            activeChmapions: ["TFT5_Garen"],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Dawnbringer",
            name: "Dawnbringer",
            description:
              "Dawnbringers rapidly heal some of their maximum Health the first time they drop below a percentage of their Health. When this occurs, all allied Dawnbringers gain bonus damage.",
            type: "origin",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "silver",
                min: 4,
                max: 5,
              },
              {
                style: "gold",
                min: 6,
                max: 7,
              },
              {
                style: "chromatic",
                min: 8,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Nightbringer",
            name: "Nightbringer",
            description:
              "Nightbringers gain a shield for several seconds equal to a percent of their maximum Health the first time they drop below a percentage of their maximum Health. When this occurs, that Nightbringer gains bonus damage.",
            type: "origin",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "silver",
                min: 4,
                max: 5,
              },
              {
                style: "silver",
                min: 6,
                max: 7,
              },
              {
                style: "gold",
                min: 8,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Knight",
            name: "Knight",
            description:
              "All allies block a flat amount of damage from all sources.",
            type: "class",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "silver",
                min: 4,
                max: 5,
              },
              {
                style: "gold",
                min: 6,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Ranger",
            name: "Ranger",
            description:
              "Rangers gain and lose bonus Attack Speed periodically. This effect begins after a delay after combat starts.",
            type: "class",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "gold",
                min: 4,
                max: 5,
              },
              {
                style: "chromatic",
                min: 6,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
        ],
        placedChampions: [
          {
            id: "TFT5_Aphelios",
            name: "Aphelios",
            cost: 4,
            row: 0,
            col: 0,
          },
          {
            id: "TFT5_Brand",
            name: "Brand",
            cost: 2,
            row: 0,
            col: 1,
          },
          {
            id: "TFT5_Draven",
            name: "Draven",
            cost: 4,
            row: 0,
            col: 2,
          },
          {
            id: "TFT5_Akshan",
            name: "Akshan",
            cost: 5,
            row: 0,
            col: 3,
          },
          {
            id: "TFT5_Diana",
            name: "Diana",
            cost: 4,
            row: 0,
            col: 4,
          },
          {
            id: "TFT5_Galio",
            name: "Galio",
            cost: 4,
            row: 1,
            col: 0,
          },
          {
            id: "TFT5_Garen",
            name: "Garen",
            cost: 5,
            row: 1,
            col: 1,
          },
          {
            id: "TFT5_Gragas",
            name: "Gragas",
            cost: 1,
            row: 1,
            col: 2,
          },
        ],
      },
      {
        activeTraits: [
          {
            id: "Set5_Victorious",
            name: "Victorious",
            description:
              "When Victorious champions score a kill, their next attack is empowered to deal a percentage of the target's missing Health as bonus magic damage.",
            type: "origin",
            sets: [
              {
                style: "gold",
                min: 1,
              },
            ],
            activeChmapions: ["TFT5_Garen"],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Dawnbringer",
            name: "Dawnbringer",
            description:
              "Dawnbringers rapidly heal some of their maximum Health the first time they drop below a percentage of their Health. When this occurs, all allied Dawnbringers gain bonus damage.",
            type: "origin",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "silver",
                min: 4,
                max: 5,
              },
              {
                style: "gold",
                min: 6,
                max: 7,
              },
              {
                style: "chromatic",
                min: 8,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Nightbringer",
            name: "Nightbringer",
            description:
              "Nightbringers gain a shield for several seconds equal to a percent of their maximum Health the first time they drop below a percentage of their maximum Health. When this occurs, that Nightbringer gains bonus damage.",
            type: "origin",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "silver",
                min: 4,
                max: 5,
              },
              {
                style: "silver",
                min: 6,
                max: 7,
              },
              {
                style: "gold",
                min: 8,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Knight",
            name: "Knight",
            description:
              "All allies block a flat amount of damage from all sources.",
            type: "class",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "silver",
                min: 4,
                max: 5,
              },
              {
                style: "gold",
                min: 6,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Ranger",
            name: "Ranger",
            description:
              "Rangers gain and lose bonus Attack Speed periodically. This effect begins after a delay after combat starts.",
            type: "class",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "gold",
                min: 4,
                max: 5,
              },
              {
                style: "chromatic",
                min: 6,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
        ],
        placedChampions: [
          {
            id: "TFT5_Aphelios",
            name: "Aphelios",
            cost: 4,
            row: 0,
            col: 0,
          },
          {
            id: "TFT5_Brand",
            name: "Brand",
            cost: 2,
            row: 0,
            col: 1,
          },
          {
            id: "TFT5_Draven",
            name: "Draven",
            cost: 4,
            row: 0,
            col: 2,
          },
          {
            id: "TFT5_Akshan",
            name: "Akshan",
            cost: 5,
            row: 0,
            col: 3,
          },
          {
            id: "TFT5_Diana",
            name: "Diana",
            cost: 4,
            row: 0,
            col: 4,
          },
          {
            id: "TFT5_Galio",
            name: "Galio",
            cost: 4,
            row: 1,
            col: 0,
          },
          {
            id: "TFT5_Garen",
            name: "Garen",
            cost: 5,
            row: 1,
            col: 1,
          },
          {
            id: "TFT5_Gragas",
            name: "Gragas",
            cost: 1,
            row: 1,
            col: 2,
          },
        ],
      },
      {
        activeTraits: [
          {
            id: "Set5_Victorious",
            name: "Victorious",
            description:
              "When Victorious champions score a kill, their next attack is empowered to deal a percentage of the target's missing Health as bonus magic damage.",
            type: "origin",
            sets: [
              {
                style: "gold",
                min: 1,
              },
            ],
            activeChmapions: ["TFT5_Garen"],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Dawnbringer",
            name: "Dawnbringer",
            description:
              "Dawnbringers rapidly heal some of their maximum Health the first time they drop below a percentage of their Health. When this occurs, all allied Dawnbringers gain bonus damage.",
            type: "origin",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "silver",
                min: 4,
                max: 5,
              },
              {
                style: "gold",
                min: 6,
                max: 7,
              },
              {
                style: "chromatic",
                min: 8,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Nightbringer",
            name: "Nightbringer",
            description:
              "Nightbringers gain a shield for several seconds equal to a percent of their maximum Health the first time they drop below a percentage of their maximum Health. When this occurs, that Nightbringer gains bonus damage.",
            type: "origin",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "silver",
                min: 4,
                max: 5,
              },
              {
                style: "silver",
                min: 6,
                max: 7,
              },
              {
                style: "gold",
                min: 8,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Knight",
            name: "Knight",
            description:
              "All allies block a flat amount of damage from all sources.",
            type: "class",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "silver",
                min: 4,
                max: 5,
              },
              {
                style: "gold",
                min: 6,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Ranger",
            name: "Ranger",
            description:
              "Rangers gain and lose bonus Attack Speed periodically. This effect begins after a delay after combat starts.",
            type: "class",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "gold",
                min: 4,
                max: 5,
              },
              {
                style: "chromatic",
                min: 6,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
        ],
        placedChampions: [
          {
            id: "TFT5_Aphelios",
            name: "Aphelios",
            cost: 4,
            row: 0,
            col: 0,
          },
          {
            id: "TFT5_Brand",
            name: "Brand",
            cost: 2,
            row: 0,
            col: 1,
          },
          {
            id: "TFT5_Draven",
            name: "Draven",
            cost: 4,
            row: 0,
            col: 2,
          },
          {
            id: "TFT5_Akshan",
            name: "Akshan",
            cost: 5,
            row: 0,
            col: 3,
          },
          {
            id: "TFT5_Diana",
            name: "Diana",
            cost: 4,
            row: 0,
            col: 4,
          },
          {
            id: "TFT5_Galio",
            name: "Galio",
            cost: 4,
            row: 1,
            col: 0,
          },
          {
            id: "TFT5_Garen",
            name: "Garen",
            cost: 5,
            row: 1,
            col: 1,
          },
          {
            id: "TFT5_Gragas",
            name: "Gragas",
            cost: 1,
            row: 1,
            col: 2,
          },
        ],
      },
      {
        activeTraits: [
          {
            id: "Set5_Victorious",
            name: "Victorious",
            description:
              "When Victorious champions score a kill, their next attack is empowered to deal a percentage of the target's missing Health as bonus magic damage.",
            type: "origin",
            sets: [
              {
                style: "gold",
                min: 1,
              },
            ],
            activeChmapions: ["TFT5_Garen"],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Dawnbringer",
            name: "Dawnbringer",
            description:
              "Dawnbringers rapidly heal some of their maximum Health the first time they drop below a percentage of their Health. When this occurs, all allied Dawnbringers gain bonus damage.",
            type: "origin",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "silver",
                min: 4,
                max: 5,
              },
              {
                style: "gold",
                min: 6,
                max: 7,
              },
              {
                style: "chromatic",
                min: 8,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Nightbringer",
            name: "Nightbringer",
            description:
              "Nightbringers gain a shield for several seconds equal to a percent of their maximum Health the first time they drop below a percentage of their maximum Health. When this occurs, that Nightbringer gains bonus damage.",
            type: "origin",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "silver",
                min: 4,
                max: 5,
              },
              {
                style: "silver",
                min: 6,
                max: 7,
              },
              {
                style: "gold",
                min: 8,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Knight",
            name: "Knight",
            description:
              "All allies block a flat amount of damage from all sources.",
            type: "class",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "silver",
                min: 4,
                max: 5,
              },
              {
                style: "gold",
                min: 6,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
          {
            id: "Set5_Ranger",
            name: "Ranger",
            description:
              "Rangers gain and lose bonus Attack Speed periodically. This effect begins after a delay after combat starts.",
            type: "class",
            sets: [
              {
                style: "bronze",
                min: 2,
                max: 3,
              },
              {
                style: "gold",
                min: 4,
                max: 5,
              },
              {
                style: "chromatic",
                min: 6,
              },
            ],
            activeChmapions: [],
            activeSetIdx: 0,
          },
        ],
        placedChampions: [
          {
            id: "TFT5_Aphelios",
            name: "Aphelios",
            cost: 4,
            row: 0,
            col: 0,
          },
          {
            id: "TFT5_Brand",
            name: "Brand",
            cost: 2,
            row: 0,
            col: 1,
          },
          {
            id: "TFT5_Draven",
            name: "Draven",
            cost: 4,
            row: 0,
            col: 2,
          },
          {
            id: "TFT5_Akshan",
            name: "Akshan",
            cost: 5,
            row: 0,
            col: 3,
          },
          {
            id: "TFT5_Diana",
            name: "Diana",
            cost: 4,
            row: 0,
            col: 4,
          },
          {
            id: "TFT5_Galio",
            name: "Galio",
            cost: 4,
            row: 1,
            col: 0,
          },
          {
            id: "TFT5_Garen",
            name: "Garen",
            cost: 5,
            row: 1,
            col: 1,
          },
          {
            id: "TFT5_Gragas",
            name: "Gragas",
            cost: 1,
            row: 1,
            col: 2,
          },
        ],
      },
    ]);
  };

  return (
    <>
      <Header title="TFT Finder" />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-5 flex">
              <div className="basis-9/12">
                <Field />
              </div>
              <div className=" basis-3/12  p-1 flex flex-col">
                <div className="h-90 border mb-3">
                  <TFTFilter />
                </div>
                <input
                  type="button"
                  value="Search"
                  className=" rounded-lg bg-blue-800 text-white w-full hover:bg-blue-600 active:bg-blue-700 text-lg"
                  onClick={onClickSearch}
                />
              </div>
            </div>
          </div>
          <div className="">
            <Tabs categories={categories} />
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await getCategories();

  return {
    props: { categories: res.data },
  };
};

TftFinder.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {/* Use ff you need per-Page Layouts
      link : https://nextjs.org/docs/basic-features/layouts#per-page-layouts
      <NestedLayout>{page}</NestedLayout> 
      */}
      {page}
    </Layout>
  );
};

export default TftFinder;
