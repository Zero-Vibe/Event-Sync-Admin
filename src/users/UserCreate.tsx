import { Create, SimpleForm, TextInput, required } from "react-admin";

export const UserCreate = () => (
  <Create
    sx={{ "& .RaCreate-main": { maxWidth: 1152, mx: "auto", px: { xs: 2, sm: 3, lg: 4 } } }}
  >
    <SimpleForm>
      <TextInput source="email" validate={required()} fullWidth />
      <TextInput
        source="password"
        type="password"
        validate={required()}
        fullWidth
      />
      <TextInput source="name" validate={required()} fullWidth />
    </SimpleForm>
  </Create>
);
