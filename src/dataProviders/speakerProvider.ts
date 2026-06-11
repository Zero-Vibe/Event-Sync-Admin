import jsonServerProvider from "ra-data-json-server";
import { DataProvider } from "react-admin";

const API_URL = import.meta.env.VITE_JSON_SERVER_URL;

const baseDataProvider = jsonServerProvider(API_URL);

export const speakerProvider: DataProvider = {
  ...baseDataProvider,
};
