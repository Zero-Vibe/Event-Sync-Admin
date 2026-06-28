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
      <TextField source="id" />
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
          <DateField source="startTime" label="Start Time (UTC)" showTime />
          <DateField source="endTime" label="End Time (UTC)" showTime />
        </Datagrid>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
);
