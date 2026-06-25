import {
  List,
  Datagrid,
  TextField,
  DateField,
  DeleteButton,
  SearchInput,
} from "react-admin";

const eventFilters = [
  <SearchInput source="title" alwaysOn key="title-filter" />,
];

export const EventList = () => (
  <List filters={eventFilters}>
    <Datagrid rowClick="show" bulkActionButtons={false}>
      <TextField source="title" />
      <DateField source="startDateTime" showTime />
      <DateField source="endDateTime" showTime />
      <TextField source="location" />
      <DeleteButton />
    </Datagrid>
  </List>
);
