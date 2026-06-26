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
      <TextField source="id" />
      <TextField source="email" />
      <BooleanField source="admin" label="Admin" />
      <DateField
        source="joinDate"
        showTime
        label="Start Time (UTC)"
        options={{ timeZone: "UTC" }}
      />
    </SimpleShowLayout>
  </Show>
);
