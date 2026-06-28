import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { theme, darkTheme } from "./theme";
import { EventList, EventShow, EventEdit, EventCreate } from "./events";
import { RoomList, RoomShow, RoomEdit, RoomCreate } from "./rooms";
import { SessionShow, SessionEdit, SessionCreate } from "./sessions";
import {
  SpeakerList,
  SpeakerShow,
  SpeakerEdit,
  SpeakerCreate,
} from "./speakers";
import { UserList, UserShow, UserEdit, UserCreate } from "./users";

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    theme={theme}
    darkTheme={darkTheme}
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
      name="sessions"
      show={SessionShow}
      edit={SessionEdit}
      create={SessionCreate}
    />
    <Resource
      name="speakers"
      list={SpeakerList}
      show={SpeakerShow}
      edit={SpeakerEdit}
      create={SpeakerCreate}
    />
    <Resource name="questions" />
    <Resource
      name="users"
      list={UserList}
      show={UserShow}
      edit={UserEdit}
      create={UserCreate}
    />
  </Admin>
);
