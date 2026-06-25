import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  ArrayInput,
  SimpleFormIterator,
  SelectInput,
} from "react-admin";

export const SpeakerEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="firstName" validate={required()} fullWidth />
      <TextInput source="lastName" validate={required()} fullWidth />
      <TextInput source="pictureUrl" fullWidth />
      <TextInput source="biography" multiline rows={4} fullWidth />
      <ArrayInput source="links" label="Links">
        <SimpleFormIterator inline>
          <SelectInput
            source="platform"
            choices={[
              { id: "TWITTER", name: "Twitter" },
              { id: "LINKEDIN", name: "LinkedIn" },
              { id: "GITHUB", name: "GitHub" },
              { id: "YOUTUBE", name: "YouTube" },
              { id: "WEBSITE", name: "Website" },
              { id: "OTHER", name: "Other" },
            ]}
            optionValue="id"
            optionText="name"
          />
          <TextInput source="url" />
          <TextInput source="label" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);
