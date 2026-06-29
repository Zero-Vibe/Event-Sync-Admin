import { Edit, SimpleForm, TextInput, BooleanInput } from "react-admin";

export const UserEdit = () => (
  <Edit
    sx={{ "& .RaEdit-main": { maxWidth: 1152, mx: "auto", px: { xs: 2, sm: 3, lg: 4 } } }}
  >
    <SimpleForm>
      <TextInput source="email" fullWidth />
      <TextInput source="name" fullWidth />
      <TextInput source="password" type="password" fullWidth />
      <BooleanInput source="admin" label="Admin" />
    </SimpleForm>
  </Edit>
);
