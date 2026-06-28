import {
  Show,
  SimpleShowLayout,
  TextField,
  ArrayField,
  Datagrid,
  DateField,
  Empty,
  ReferenceField,
  FunctionField,
} from "react-admin";
import { Card, CardContent, Typography } from "@mui/material";
import { StatusBadge } from "../components/StatusBadge";

export const RoomShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="id" />
    </SimpleShowLayout>
    <Card variant="outlined" sx={{ mx: 2, mb: 3, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Sessions
        </Typography>
        <ArrayField source="sessions">
          <Datagrid
            rowClick={false}
            bulkActionButtons={false}
            empty={<Empty resource="sessions" />}
          >
            <TextField source="title" />
            <ReferenceField source="eventId" reference="events">
              <TextField source="title" />
            </ReferenceField>
            <FunctionField
              label="Status"
              render={(record) => <StatusBadge startTime={record.startTime} endTime={record.endTime} />}
            />
            <DateField source="startTime" showTime />
            <DateField source="endTime" showTime />
          </Datagrid>
        </ArrayField>
      </CardContent>
    </Card>
  </Show>
);
