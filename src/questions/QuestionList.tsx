import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  ReferenceField,
  DeleteButton,
  useShowContext,
} from "react-admin";
import { useSearchParams } from "react-router-dom";

export const QuestionList = () => {
  const { record } = useShowContext();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");

  if (!record) return null;
  const sessionId = record.id;

  return (
    <List
      resource="questions"
      queryOptions={{ meta: { eventId, sessionId } }}
      actions={false}
      sort={{ field: "upvotes", order: "DESC" }}
      title={false}
      empty={false}
    >
      <Datagrid bulkActionButtons={false} rowClick={false}>
        <TextField source="content" />
        <ReferenceField
          source="user.id"
          reference="users"
          label="Creator"
          empty="Anonymous"
        >
          <TextField source="name" />
        </ReferenceField>
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
