import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  ArrayInput,
  SimpleFormIterator,
  SelectInput,
  ImageInput,
  ImageField,
} from "react-admin";

export const SpeakerEdit = () => {
  const transformData = async (data) => {
    if (!data["base64Picture"] || !data["base64Picture"]["rawFile"]) {
      return data;
    }

    const convertToBase64 = (imageData) =>
      new Promise((res, rej) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageData);
        reader.onload = () => res(reader.result);
        reader.onerror = (err) => rej(err);
      });

    const base64 = await convertToBase64(data["base64Picture"]["rawFile"]);

    return {
      ...data,
      base64Picture: base64,
    };
  };

  return (
    <Edit
      transform={transformData}
      sx={{
        "& .RaEdit-main": {
          maxWidth: 1152,
          mx: "auto",
          px: { xs: 2, sm: 3, lg: 4 },
        },
      }}
    >
      <SimpleForm>
        <TextInput source="firstName" validate={required()} fullWidth />
        <TextInput source="lastName" validate={required()} fullWidth />
        <ImageInput source="base64Picture" label="Picture" accept="image/*">
          <ImageField source="src" />
        </ImageInput>
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
};
