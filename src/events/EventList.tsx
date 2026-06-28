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
  <List
    filters={eventFilters}
    sx={{
      "& .RaList-main": { maxWidth: 1152, mx: "auto", px: { xs: 2, sm: 3, lg: 4 } },
      "& .RaList-content": { borderRadius: 3, overflow: "hidden" },
    }}
  >
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
