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
      <DateField
        source="startDateTime"
        label="Start Time (UTC)"
        showTime
        options={{ timeZone: "UTC" }}
      />
      <DateField
        source="endDateTime"
        label="End Time (UTC)"
        showTime
        options={{ timeZone: "UTC" }}
      />
      <TextField source="location" />
      <DeleteButton />
    </Datagrid>
  </List>
);
