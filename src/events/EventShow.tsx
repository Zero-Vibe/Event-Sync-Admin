import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  List,
  Datagrid,
  EditButton,
  DeleteButton,
  useShowContext,
  useRecordContext,
  TopToolbar,
  CreateButton,
} from "react-admin";

const SessionEditButton = () => {
  const record = useRecordContext();
  if (!record) return null;
  return (
    <EditButton to={`/sessions/${record.id}/edit?eventId=${record.eventId}`} />
  );
};

const SessionListActions = ({ eventId }: { eventId: string }) => (
  <TopToolbar>
    <CreateButton to={`/sessions/create?eventId=${eventId}`} />
  </TopToolbar>
);

const SessionsList = () => {
  const { record } = useShowContext();
  if (!record) return null;
  const eventId = record.id;
  return (
    <List
      resource="sessions"
      queryOptions={{ meta: { eventId } }}
      actions={<SessionListActions eventId={eventId} />}
    >
      <Datagrid
        bulkActionButtons={false}
        rowClick={(id) => `/sessions/${id}/show?eventId=${eventId}`}
      >
        <TextField source="title" />
        <TextField source="status" />
        <DateField source="startTime" showTime />
        <DateField source="endTime" showTime />
        <SessionEditButton />
        <DeleteButton
          redirect={false}
          mutationOptions={{ meta: { eventId: record.id } }}
        />
      </Datagrid>
    </List>
  );
};

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
    <SessionsList />
  </Show>
);
