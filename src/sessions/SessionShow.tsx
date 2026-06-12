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
} from "react-admin";
import { useSearchParams } from "react-router-dom";

const SessionTitle = () => {
  const { record } = useShowContext();
  return <span>{record?.title || null}</span>;
};

export const SessionShow = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");

  return (
    <Show title={<SessionTitle />} queryOptions={{ meta: { eventId } }}>
      <SimpleShowLayout>
        <TextField source="title" />
        <TextField source="description" />
        <DateField source="startTime" showTime label="Start" />
        <DateField source="endTime" showTime label="End" />
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
    </Show>
  );
};
