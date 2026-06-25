import {
  Show,
  SimpleShowLayout,
  TextField,
  ArrayField,
  Datagrid,
  UrlField,
  FunctionField,
} from "react-admin";

export const SpeakerShow = () => (
  <Show>
    <SimpleShowLayout>
      <FunctionField
        label="Picture"
        render={(record) =>
          record.base64Picture ? <img src={record.base64Picture} /> : null
        }
        style={{ maxWidth: "200px", borderRadius: "4px" }}
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
