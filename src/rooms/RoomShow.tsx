import {
  Show,
  SimpleShowLayout,
  TextField,
  ArrayField,
  Datagrid,
  DateField,
} from "react-admin";

export const RoomShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" />
      <ArrayField source="sessions" label="Sessions">
        <Datagrid bulkActionButtons={false}>
          <TextField source="title" />
          <TextField source="status" />
          <DateField source="startTime" showTime />
          <DateField source="endTime" showTime />
        </Datagrid>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
);
