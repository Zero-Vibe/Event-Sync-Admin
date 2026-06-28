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
  ReferenceField,
  FunctionField,
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
      title={false}
      empty={false} // just to make the working create button in topBar
    >
      <Datagrid
        bulkActionButtons={false}
        rowClick={(id) => `/sessions/${id}/show?eventId=${eventId}`}
      >
        <TextField source="title" />
        <DateField
          source="startTime"
          showTime
          label="Start Time (UTC)"
          options={{ timeZone: "UTC" }}
        />
        <DateField
          source="endTime"
          showTime
          label="End Time (UTC)"
          options={{ timeZone: "UTC" }}
        />
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
      <TextField source="id" />
      <TextField source="description" />
      <DateField
        source="startDateTime"
        label="Start Time (UTC)"
        showTime
        options={{ timeZone: "UTC" }}
      />
      <DateField
        source="endDateTime"
        label="End Time (UTC)"
        showTime
        options={{ timeZone: "UTC" }}
      />
      <TextField source="location" />
      <ReferenceField
        reference="users"
        source="createdBy.id"
        label="Created By"
      >
        <FunctionField
          render={(record) => `${record.name} (${record.email})`}
        />
      </ReferenceField>{" "}
    </SimpleShowLayout>
    <SessionsList />
  </Show>
);
