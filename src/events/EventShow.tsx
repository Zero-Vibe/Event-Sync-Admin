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
  FunctionField,
} from "react-admin";
import { SectionBox, SectionHeader } from "../components/SectionBox";
import { StatusBadge } from "../components/StatusBadge";

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

const SessionList = () => {
  const { record } = useShowContext();
  if (!record) return null;
  const eventId = record.id;
  return (
    <List
      resource="sessions"
      queryOptions={{ meta: { eventId } }}
      actions={<SessionListActions eventId={eventId} />}
      title={false}
      empty={false}
    >
      <Datagrid
        bulkActionButtons={false}
        rowClick={(id) => `/sessions/${id}/show?eventId=${eventId}`}
      >
        <TextField source="title" />
        <FunctionField
          label="Status"
          render={(record) => <StatusBadge startTime={record.startTime} endTime={record.endTime} />}
        />
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
      <TextField source="createdBy.name" label="Created by" />
    </SimpleShowLayout>
    <SectionBox>
      <SectionHeader title="Sessions" />
      <SessionList />
    </SectionBox>
  </Show>
);
