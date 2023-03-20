import axios from "axios";
import {} from "./interfaces";
import {
  ReqSearchQuery,
  ResCategories,
  ResSearchResult,
} from "../shared/sharedInterfaces";
import qs from "qs";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_HOST,
  paramsSerializer: (params) => qs.stringify(params),
});

export const getCategories = () => {
  return instance.get<ResCategories>("/api/tftfinder/categories");
};

export const getSearch = (option: ReqSearchQuery) => {
  return instance.get<ResSearchResult[]>("/api/tftfinder/search", {
    params: option,
  });
};

export async function getStaticProps() {}
