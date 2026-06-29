import {
  List,
  Datagrid,
  TextField,
  DeleteButton,
  SearchInput,
} from "react-admin";

const roomFilters = [<SearchInput source="name" alwaysOn key="name-filter" />];

export const RoomList = () => (
  <List
    filters={roomFilters}
    sx={{
      "& .RaList-main": {
        maxWidth: 1152,
        mx: "auto",
        px: { xs: 2, sm: 3, lg: 4 },
      },
      "& .RaList-content": { borderRadius: 3, overflow: "hidden" },
    }}
  >
    <Datagrid rowClick="show" bulkActionButtons={false}>
      <TextField source="name" />
      <DeleteButton />
    </Datagrid>
  </List>
);
