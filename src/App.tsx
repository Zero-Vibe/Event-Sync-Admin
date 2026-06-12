import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { EventList, EventShow, EventEdit, EventCreate } from "./events";
import { RoomList, RoomShow, RoomEdit, RoomCreate } from "./rooms";

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    requireAuth
  >
    <Resource
      name="rooms"
      list={RoomList}
      show={RoomShow}
      edit={RoomEdit}
      create={RoomCreate}
    />
    <Resource
      name="events"
      list={EventList}
      show={EventShow}
      edit={EventEdit}
      create={EventCreate}
    />
    <Resource
      name="speakers"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
  </Admin>
);
