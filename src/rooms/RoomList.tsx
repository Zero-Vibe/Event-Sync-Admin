import {
  List,
  Datagrid,
  TextField,
  DeleteButton,
  SearchInput,
} from "react-admin";

const roomFilters = [<SearchInput source="name" alwaysOn key="name-filter" />];

export const RoomList = () => (
  <List filters={roomFilters}>
    <Datagrid rowClick="show" bulkActionButtons={false}>
      <TextField source="name" />
      <DeleteButton />
    </Datagrid>
  </List>
);
