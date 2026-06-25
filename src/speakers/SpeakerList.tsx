import {
  List,
  Datagrid,
  TextField,
  DeleteButton,
  SearchInput,
  FunctionField,
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
      <FunctionField
        label="Picture"
        render={(record) =>
          record.base64Picture ? <img src={record.base64Picture} /> : null
        }
        style={{ maxWidth: "200px", borderRadius: "4px" }}
      />
      <DeleteButton />
    </Datagrid>
  </List>
);
