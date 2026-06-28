import jsonServerProvider from "ra-data-json-server";
import { combineDataProviders, DataProvider } from "react-admin";
import {
  eventProvider,
  questionProvider,
  roomProvider,
  sessionProvider,
  speakerProvider,
  userProvider,
} from "./dataProviders/dataProviders";

const dataProviders: { dataProvider: DataProvider; resources: string[] }[] = [
  { dataProvider: roomProvider, resources: ["rooms"] },
  { dataProvider: sessionProvider, resources: ["sessions"] },
  { dataProvider: questionProvider, resources: ["questions"] },
  { dataProvider: eventProvider, resources: ["events"] },
  { dataProvider: speakerProvider, resources: ["speakers"] },
  { dataProvider: userProvider, resources: ["users"] },
];

const baseDataProvider = jsonServerProvider(
  import.meta.env.VITE_JSON_SERVER_URL,
);

export const dataProvider: DataProvider = combineDataProviders(
  (resource: string) => {
    return (
      dataProviders.find((dp) => dp.resources.includes(resource))
        ?.dataProvider || baseDataProvider
    );
  },
);

export default dataProvider;
