import { Create, SimpleForm, TextInput, required } from "react-admin";

export const RoomCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={required()} fullWidth />
    </SimpleForm>
  </Create>
);
