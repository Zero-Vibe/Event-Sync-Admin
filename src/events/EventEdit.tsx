import {
  Edit,
  SimpleForm,
  TextInput,
  DateTimeInput,
  required,
} from "react-admin";

export const EventEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" validate={required()} fullWidth />
      <TextInput source="description" multiline rows={4} fullWidth />
      <DateTimeInput source="startDateTime" validate={required()} />
      <DateTimeInput source="endDateTime" validate={required()} />
      <TextInput source="location" fullWidth />
    </SimpleForm>
  </Edit>
);
