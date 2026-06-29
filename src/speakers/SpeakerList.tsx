import {
  List,
  Datagrid,
  TextField,
  DeleteButton,
  SearchInput,
  FunctionField,
} from "react-admin";
import { Avatar } from "@mui/material";

const speakerFilters = [
  <SearchInput source="firstName" alwaysOn key="firstName-filter" />,
];

export const SpeakerList = () => (
  <List
    filters={speakerFilters}
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
      <FunctionField
        label="Photo"
        render={(record) =>
          record.base64Picture ? (
            <Avatar
              src={record.base64Picture}
              alt={`${record.firstName} ${record.lastName}`}
              sx={{ width: 36, height: 36 }}
            />
          ) : (
            <Avatar
              sx={{
                width: 36,
                height: 36,
                fontSize: "0.875rem",
                bgcolor: "action.hover",
                color: "text.secondary",
              }}
            >
              {record.firstName?.[0]}
              {record.lastName?.[0]}
            </Avatar>
          )
        }
      />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="biography" />
      <DeleteButton />
    </Datagrid>
  </List>
);
