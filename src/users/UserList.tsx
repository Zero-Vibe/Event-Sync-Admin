import { Switch } from "@mui/material";
import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  DateField,
  DeleteButton,
  useRecordContext,
  useUpdate,
} from "react-admin";
import { User } from "../types";

const AdminToggle = () => {
  const record = useRecordContext<User>();
  const [update, { isLoading }] = useUpdate();
  if (!record) return null;
  return (
    <Switch
      color="primary"
      size="small"
      checked={record.admin}
      disabled={isLoading}
      onClick={(e) => e.stopPropagation()}
      onChange={() =>
        update("users", {
          id: record.id,
          data: { isAdmin: !record.admin },
          previousData: record,
        })
      }
    />
  );
};

export const UserList = () => (
  <List
    sx={{
      "& .RaList-main": {
        maxWidth: 1152,
        mx: "auto",
        px: { xs: 2, sm: 3, lg: 4 },
      },
      "& .RaList-content": { borderRadius: 3, overflow: "hidden" },
    }}
  >
    <Datagrid rowClick="show" bulkActionButtons={false}>
      <TextField source="name" />
      <TextField source="email" />
      <BooleanField source="admin" sortBy="isAdmin" label="Admin" />
      <DateField
        source="joinDate"
        showTime
        label="Start Time (UTC)"
        options={{ timeZone: "UTC" }}
      />
      <AdminToggle />
      <DeleteButton />
    </Datagrid>
  </List>
);
