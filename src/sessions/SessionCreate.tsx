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
import { transformToUTC } from "../utils/timezoneUtils";

const transformDate = (data: Record<string, unknown>) => {
  if (!data) return;
  if (data.startTime) data.startTime = transformToUTC(data["startTime"]);
  if (data.endTime) data.endTime = transformToUTC(data["endTime"]);
};

export const SessionCreate = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");

  return (
    <Create
      mutationOptions={{ meta: { eventId } }}
      transform={(data: Record<string, unknown>) => {
        transformDate(data);
        return {
          ...data,
          eventId,
          speakersId:
            (data.speakersId as Array<{ speakerId: string }>)
              ?.map((item) => item.speakerId)
              .filter(Boolean) ?? [],
        };
      }}
      redirect={(resource, id) => `/${resource}/${id}/show?eventId=${eventId}`}
      sx={{ "& .RaCreate-main": { maxWidth: 1152, mx: "auto", px: { xs: 2, sm: 3, lg: 4 } } }}
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
