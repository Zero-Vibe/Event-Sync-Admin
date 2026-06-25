import { Edit, SimpleForm, TextInput, BooleanInput } from "react-admin";

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="email" fullWidth />
      <TextInput source="name" fullWidth />
      <TextInput source="password" type="password" fullWidth />
      <BooleanInput source="admin" label="Admin" />
    </SimpleForm>
  </Edit>
);
