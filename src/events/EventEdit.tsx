import {
  Edit,
  SimpleForm,
  TextInput,
  DateTimeInput,
  required,
} from "react-admin";
import { formatFromUTC, transformToUTC } from "../utils/timezoneUtils";

const transformDate = (data: Record<string, unknown>) => {
  return {
    ...data,
    startDateTime: transformToUTC(data["startDateTime"]),
    endDateTime: transformToUTC(data["endDateTime"]),
  };
};

export const EventEdit = () => (
  <Edit
    transform={transformDate}
    queryOptions={{
      select: (data) => {
        if (!data) return data;
        data["startDateTime"] = formatFromUTC(data["startDateTime"]);
        data["endDateTime"] = formatFromUTC(data["endDateTime"]);
        return data;
      },
    }}
    sx={{
      "& .RaEdit-main": {
        maxWidth: 1152,
        mx: "auto",
        px: { xs: 2, sm: 3, lg: 4 },
      },
    }}
  >
    <SimpleForm>
      <TextInput source="title" validate={required()} fullWidth />
      <TextInput source="description" multiline rows={4} fullWidth />
      <DateTimeInput
        source="startDateTime"
        label="Start time (UTC)"
        validate={required()}
      />
      <DateTimeInput
        source="endDateTime"
        label="End time (UTC)"
        validate={required()}
      />
      <TextInput source="location" fullWidth />
    </SimpleForm>
  </Edit>
);
