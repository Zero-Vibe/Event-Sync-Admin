import {
  Show,
  SimpleShowLayout,
  TextField,
  ArrayField,
  Datagrid,
  DateField,
  Empty,
  ReferenceField,
} from "react-admin";
import { Card, CardContent, Typography } from "@mui/material";

export const RoomShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="id" />
    </SimpleShowLayout>
    <Card variant="outlined" sx={{ mx: 2, mb: 2 }}>
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
            <TextField source="status" />
            <DateField source="startTime" showTime />
            <DateField source="endTime" showTime />
          </Datagrid>
        </ArrayField>
      </CardContent>
    </Card>
  </Show>
);
