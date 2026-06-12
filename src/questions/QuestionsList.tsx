import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  DeleteButton,
  TopToolbar,
  CreateButton,
  useShowContext,
} from "react-admin";
import { useSearchParams } from "react-router-dom";

const QuestionsListActions = ({
  eventId,
  sessionId,
}: {
  eventId: string;
  sessionId: string;
}) => (
  <TopToolbar>
    <CreateButton
      to={`/questions/create?eventId=${eventId}&sessionId=${sessionId}`}
    />
  </TopToolbar>
);

export const QuestionsList = () => {
  const { record } = useShowContext();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");

  if (!record) return null;
  const sessionId = record.id;

  return (
    <List
      resource="questions"
      queryOptions={{ meta: { eventId, sessionId } }}
      actions={
        <QuestionsListActions eventId={eventId!} sessionId={sessionId} />
      }
      sort={{ field: "upvotes", order: "DESC" }}
    >
      <Datagrid bulkActionButtons={false} rowClick={false}>
        <TextField source="content" />
        <TextField source="user.name" label="Creator" emptyText="Anonymous" />
        <NumberField source="upvotes" />
        <DateField source="createdAt" showTime />
        <DeleteButton
          redirect={false}
          mutationOptions={{ meta: { eventId, sessionId } }}
        />
      </Datagrid>
    </List>
  );
};
