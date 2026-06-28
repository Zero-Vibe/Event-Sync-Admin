import {
  Show,
  SimpleShowLayout,
  TextField,
  ArrayField,
  Datagrid,
  UrlField,
  FunctionField,
} from "react-admin";
import { Avatar } from "@mui/material";

export const SpeakerShow = () => (
  <Show>
    <SimpleShowLayout>
      <FunctionField
        label="Photo"
        render={(record) =>
          record.base64Picture ? (
            <Avatar
              src={record.base64Picture}
              alt={`${record.firstName} ${record.lastName}`}
              sx={{ width: 80, height: 80 }}
            />
          ) : (
            <Avatar
              sx={{ width: 80, height: 80, fontSize: "1.5rem", bgcolor: "action.hover", color: "text.secondary" }}
            >
              {record.firstName?.[0]}{record.lastName?.[0]}
            </Avatar>
          )
        }
      />
      <TextField source="id" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="biography" />
      <ArrayField source="links" label="Links" emptyText="No links">
        <Datagrid bulkActionButtons={false} rowClick={false} empty={"No links"}>
          <TextField source="platform" />
          <UrlField source="url" />
          <TextField source="label" />
        </Datagrid>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
);
