import { useCallback, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import {
  ResCategories,
  TabCategory,
  PanelType,
} from "../../shared/sharedInterfaces";
import React from "react";
import { getCategories } from "../requestHandler";
import PanelContent from "./Tab.PanelContent";
import { classNames } from "../utils";
import { useRecoilState } from "recoil";
import { tabIdxState } from "../states/filterState";

interface Props {
  categories: ResCategories;
}

const Tabs: React.FC<Props> = (props: Props) => {
  const { categories } = props;
  const [tabIdx, setTabIdx] = useRecoilState(tabIdxState);

  return (
    <div className="w-full px-2 py-16 sm:px-0">
      <Tab.Group
        onChange={(idx) => {
          setTabIdx(idx);
        }}
        selectedIndex={tabIdx}
      >
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  " w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
                  "ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2 min-h-[600px]">
          {Object.values(categories).map((category, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "bg-white rounded-xl p-3",
                "ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
              )}
            >
              <PanelContent category={category} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Tabs;
