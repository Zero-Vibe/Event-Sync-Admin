import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  required,
} from "react-admin";
import { useSearchParams } from "react-router-dom";

export const QuestionCreate = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");
  const sessionId = searchParams.get("sessionId");

  return (
    <Create
      mutationOptions={{ meta: { eventId, sessionId } }}
      redirect={(resource, id) =>
        `/questions/${id}/show?eventId=${eventId}&sessionId=${sessionId}`
      }
      sx={{ "& .RaCreate-main": { maxWidth: 1152, mx: "auto", px: { xs: 2, sm: 3, lg: 4 } } }}
    >
      <SimpleForm>
        <TextInput source="content" validate={required()} fullWidth />
        <NumberInput source="upvotes" defaultValue={0} />
      </SimpleForm>
    </Create>
  );
};
