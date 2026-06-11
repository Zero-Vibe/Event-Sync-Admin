import { Show, SimpleShowLayout, TextField, DateField } from "react-admin";

export const EventShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="title" />
      <TextField source="description" />
      <DateField source="startDateTime" showTime label="Start" />
      <DateField source="endDateTime" showTime label="End" />
      <TextField source="location" />
      <TextField source="createdBy.name" label="Created by" />
    </SimpleShowLayout>
  </Show>
);
