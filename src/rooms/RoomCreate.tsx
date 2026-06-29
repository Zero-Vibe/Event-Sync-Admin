import { Create, SimpleForm, TextInput, required } from "react-admin";

export const RoomCreate = () => (
  <Create
    sx={{
      "& .RaCreate-main": {
        maxWidth: 1152,
        mx: "auto",
        px: { xs: 2, sm: 3, lg: 4 },
      },
    }}
  >
    <SimpleForm>
      <TextInput source="name" validate={required()} fullWidth />
    </SimpleForm>
  </Create>
);
