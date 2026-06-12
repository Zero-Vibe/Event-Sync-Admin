import {
  Show,
  SimpleShowLayout,
  TextField,
  ArrayField,
  Datagrid,
  DateField,
  Empty,
  ReferenceField,
} from "react-admin";

export const RoomShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" />
      <ArrayField source="sessions" label="Sessions">
        <Datagrid
          rowClick={false}
          bulkActionButtons={false}
          empty={<Empty resource="sessions" />}
        >
          <TextField source="title" />
          <ReferenceField source="eventId" reference="events">
            <TextField source="title" />
          </ReferenceField>
          <TextField source="status" />
          <DateField source="startTime" showTime />
          <DateField source="endTime" showTime />
        </Datagrid>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
);
