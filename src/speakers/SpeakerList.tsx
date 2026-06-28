import {
  List,
  Datagrid,
  TextField,
  DeleteButton,
  SearchInput,
  FunctionField,
} from "react-admin";
import { Box } from "@mui/material";

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
          record.base64Picture ? (
            <Box
              component="img"
              src={record.base64Picture}
              sx={{ maxWidth: 200, borderRadius: 1.5 }}
            />
          ) : null
        }
      />
      <DeleteButton />
    </Datagrid>
  </List>
);
