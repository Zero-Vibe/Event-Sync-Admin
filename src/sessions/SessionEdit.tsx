import {
  Edit,
  SimpleForm,
  TextInput,
  DateTimeInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  required,
  ArrayInput,
  SimpleFormIterator,
} from "react-admin";
import { useSearchParams } from "react-router-dom";
import { formatFromUTC, transformToUTC } from "../utils/timezoneUtils";

const transformDate = (data: Record<string, unknown>) => {
  if (!data) return;
  if (data.startTime) data.startTime = transformToUTC(data["startTime"]);
  if (data.endTime) data.endTime = transformToUTC(data["endTime"]);
};

const transformOnSave = (data: Record<string, unknown>) => {
  const raw = data.speakersId as Array<{ speakerId: string }> | undefined;
  transformDate(data);
  return {
    ...data,
    speakersId: raw?.map((item) => item.speakerId).filter(Boolean) ?? [],
  };
};

const transformOnLoad = (data: Record<string, unknown>) => {
  if (data.speakers && Array.isArray(data.speakers)) {
    return {
      ...data,
      startTime: formatFromUTC(data.startTime),
      endTime: formatFromUTC(data.endTime),
      speakersId: (data.speakers as Array<{ id: string }>).map((s) => ({
        speakerId: s.id,
      })),
    };
  }
  return data;
};

export const SessionEdit = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");

  return (
    <Edit
      queryOptions={{ meta: { eventId }, select: transformOnLoad }}
      mutationOptions={{ meta: { eventId } }}
      transform={(data) => {
        data.eventId = eventId;
        return transformOnSave(data);
      }}
      redirect={(resource, id) => `/${resource}/${id}/show?eventId=${eventId}`}
      actions={false}
      sx={{ "& .RaEdit-main": { maxWidth: 1152, mx: "auto", px: { xs: 2, sm: 3, lg: 4 } } }}
    >
      <SimpleForm>
        <TextInput source="title" validate={required()} fullWidth />
        <TextInput source="description" multiline rows={4} fullWidth />
        <DateTimeInput
          source="startTime"
          label="Start Time (UTC)"
          validate={required()}
        />
        <DateTimeInput
          source="endTime"
          label="End Time (UTC)"
          validate={required()}
        />
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
    </Edit>
  );
};
