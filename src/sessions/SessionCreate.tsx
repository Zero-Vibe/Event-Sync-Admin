import {
  Create,
  SimpleForm,
  TextInput,
  DateTimeInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  required,
  SimpleFormIterator,
  ArrayInput,
} from "react-admin";
import { useSearchParams } from "react-router-dom";

export const SessionCreate = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");

  return (
    <Create
      mutationOptions={{ meta: { eventId } }}
      transform={(data: Record<string, unknown>) => ({
        eventId,
        title: data.title,
        description: data.description,
        startTime: data.startTime,
        endTime: data.endTime,
        roomId: data.roomId,
        capacity: data.capacity,
        speakersId:
          (data.speakersId as Array<{ speakerId: string }>)
            ?.map((item) => item.speakerId)
            .filter(Boolean) ?? [],
      })}
      redirect={(resource, id) => `/sessions/${id}/show?eventId=${eventId}`}
    >
      <SimpleForm>
        <TextInput source="title" validate={required()} fullWidth />
        <TextInput source="description" multiline rows={4} fullWidth />
        <DateTimeInput source="startTime" validate={required()} />
        <DateTimeInput source="endTime" validate={required()} />
        <ReferenceInput source="roomId" reference="rooms">
          <SelectInput optionText="name" />
        </ReferenceInput>
        <NumberInput source="capacity" />
        <ArrayInput source="speakersId" label="Speaker(s)">
          <SimpleFormIterator inline>
            <ReferenceInput source="speakerId" reference="speakers">
              <SelectInput
                optionText={(r: { firstName: string; lastName: string }) =>
                  `${r.firstName} ${r.lastName}`
                }
              />
            </ReferenceInput>
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Create>
  );
};
