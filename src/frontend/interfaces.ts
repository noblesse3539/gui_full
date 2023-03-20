import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import { Trait, TraitSet } from "../shared/sharedInterfaces";

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export interface TraitSetState {
  [id: string]: {
    checked: boolean;
    selectedListId: string;
    list: TraitSetListState;
  };
}

export interface TraitSetMap {
  [id: string]: TraitSet[];
}

export interface TraitMap {
  [id: string]: CountedTrait;
}
export interface CountedTrait extends Trait {
  traitSetIdx: number;
}

export interface TraitSetListState {
  [id: string]: {
    value: string;
  };
}

export type TraitSetReducerAction =
  | TraitSetInitAct
  | TraitSetCheckAct
  | TraitSetSelectAct;

interface TraitSetInitAct {
  type: TraitSetActionType.INIT;
  traitSet: TraitSetState;
}

interface TraitSetCheckAct {
  type: TraitSetActionType.CHECK;
  id: string;
}

interface TraitSetSelectAct {
  type: TraitSetActionType.SELECT;
  id: string;
  selectedListId: string;
}

export enum TraitSetActionType {
  INIT,
  CHECK,
  SELECT,
}

export interface TraitCardState {
  [id: string]: {
    trait: Trait;
    checked: boolean;
    selectedSetIdx: number;
  };
}

export enum TraitCardActionType {
  INIT,
  CHECK,
  SELECT,
}

export type TraitCardReducerAction =
  | TraitCardInitAct
  | TraitCardCheckAct
  | TraitCardSelectAct;

interface TraitCardInitAct {
  type: TraitCardActionType.INIT;
  traitCard: TraitCardState;
}

interface TraitCardCheckAct {
  type: TraitCardActionType.CHECK;
  id: string;
}

interface TraitCardSelectAct {
  type: TraitCardActionType.SELECT;
  id: string;
  selectedSetIdx: number;
}
