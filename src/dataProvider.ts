import jsonServerProvider from "ra-data-json-server";
import { combineDataProviders, DataProvider } from "react-admin";
import { roomProvider, sessionProvider } from "./dataProviders/dataProviders";

const dataProviders: { dataProvider: DataProvider; ressources: string[] }[] = [
  { dataProvider: roomProvider, ressources: ["rooms"] },
  { dataProvider: sessionProvider, ressources: ["sessions"] },
];

const baseDataProvider = jsonServerProvider(
  import.meta.env.VITE_JSON_SERVER_URL,
);

export const dataProvider: DataProvider = combineDataProviders(
  (ressource: string) => {
    return (
      dataProviders.find((dp) => dp.ressources.includes(ressource))
        ?.dataProvider || baseDataProvider
    );
  },
);

export default dataProvider;
