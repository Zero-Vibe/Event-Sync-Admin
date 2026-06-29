import { Edit, SimpleForm, TextInput, required } from "react-admin";

export const RoomEdit = () => (
  <Edit
    sx={{ "& .RaEdit-main": { maxWidth: 1152, mx: "auto", px: { xs: 2, sm: 3, lg: 4 } } }}
  >
    <SimpleForm>
      <TextInput source="name" validate={required()} fullWidth />
    </SimpleForm>
  </Edit>
);
