import { Edit, SimpleForm, TextInput, required } from "react-admin";

export const RoomEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" validate={required()} fullWidth />
    </SimpleForm>
  </Edit>
);
