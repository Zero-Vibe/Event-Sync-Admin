import {
  Show,
  SimpleShowLayout,
  TextField,
  BooleanField,
  DateField,
} from "react-admin";

export const UserShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="email" />
      <BooleanField source="admin" label="Admin" />
      <DateField source="joinDate" showTime />
    </SimpleShowLayout>
  </Show>
);
