import { Create, SimpleForm, TextInput, required } from "react-admin";

export const UserCreate = () => (
  <Create>
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
