import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  NumberField,
  ArrayField,
  Datagrid,
  useShowContext,
  ReferenceField,
  Title,
  TopToolbar,
  EditButton,
} from "react-admin";
import { useSearchParams } from "react-router-dom";
import { QuestionsList } from "../questions";

const SessionTitle = () => {
  const { record } = useShowContext();
  return <Title title={"Details " + record?.title || null} />;
};

const SessionActions = () => {
  const { record } = useShowContext();
  if (!record) return null;
  return (
    <TopToolbar>
      <EditButton
        to={`/sessions/${record.id}/edit?eventId=${record.eventId}`}
      />
    </TopToolbar>
  );
};

export const SessionShow = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");

  return (
    <Show
      actions={<SessionActions />}
      title={<SessionTitle />}
      queryOptions={{ meta: { eventId } }}
    >
      <SimpleShowLayout>
        <TextField source="title" />
        <TextField source="id" />
        <TextField source="description" />
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
        <TextField source="status" />
        <NumberField source="capacity" emptyText="Unlimited" />
        <ReferenceField reference="rooms" source="roomId">
          <TextField source="name" label="Room" emptyText="No room assigned" />
        </ReferenceField>
        <ArrayField source="speakers" label="Speakers" emptyText="No speakers">
          <Datagrid
            bulkActionButtons={false}
            rowClick={(speakerId) => `/speakers/${speakerId}/show`}
            empty={"No speakers"}
          >
            <TextField source="firstName" />
            <TextField source="lastName" />
          </Datagrid>
        </ArrayField>
      </SimpleShowLayout>
      <QuestionsList />
    </Show>
  );
};
