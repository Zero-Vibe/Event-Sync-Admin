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
  <List>
    <Datagrid rowClick="show" bulkActionButtons={false}>
      <TextField source="name" />
      <TextField source="email" />
      <BooleanField source="admin" label="Admin" />
      <DateField source="joinDate" showTime />
      <AdminToggle />
      <DeleteButton />
    </Datagrid>
  </List>
);
