import {
  List,
  Datagrid,
  TextField,
  ImageField,
  DeleteButton,
  SearchInput,
} from "react-admin";

const speakerFilters = [
  <SearchInput source="firstName" alwaysOn key="firstName-filter" />,
];

export const SpeakerList = () => (
  <List filters={speakerFilters}>
    <Datagrid rowClick="show" bulkActionButtons={false}>
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="biography" />
      <ImageField
        source="pictureUrl"
        label="Picture"
        sx={{ "& img": { maxWidth: 50, maxHeight: 50, borderRadius: "50%" } }}
      />
      <DeleteButton />
    </Datagrid>
  </List>
);
