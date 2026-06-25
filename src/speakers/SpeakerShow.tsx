import {
  Show,
  SimpleShowLayout,
  TextField,
  ImageField,
  ArrayField,
  Datagrid,
  UrlField,
} from "react-admin";

export const SpeakerShow = () => (
  <Show>
    <SimpleShowLayout>
      <ImageField
        source="pictureUrl"
        label="Picture"
        sx={{ "& img": { maxWidth: 150, borderRadius: "50%" } }}
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
