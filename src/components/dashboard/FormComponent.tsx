import {
  Box,
  Button,
  FileInput,
  Flex,
  SimpleGrid,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import Signature from "signature_pad";
import { DocumentType, zDocument } from "../../types/document.type";
import DigitalSignature from "./DigitalSignature";
import classes from "./dashboard.module.css";
import { useSignDocument } from "./hooks/useSignDocument";



const FormComponent = () => {
  const [savedSignature, setSavedSignature] = useState<string>("");
  const [signaturePad, setSignaturePad] = useState<Signature | null>(null);
  const [value, setValue] = useState<File | null>(null);
  const [signIsEmpty, setSignIsEmpty] = useState<boolean>(signaturePad?.isEmpty ?? true);
  const { mutate } = useSignDocument();

  const form = useForm<DocumentType>({
    validate: zodResolver(zDocument),
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      signature: "",
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  });

  const handleSignDoc = (values: DocumentType) => {
    console.log("values", value);


    if (signaturePad?.isEmpty()) {
      notifications.show({
        title: "Error",
        message: "Please sign the document",
        color: "red",
      })
      return;
    }

    const formData = new FormData();
    formData.append("firstName", values.firstName ?? "");
    formData.append("lastName", values.lastName ?? "");
    formData.append("email", values.email);
    formData.append("signature", savedSignature);
    formData.append("doc", value || '');


    mutate(formData, {
      onSuccess: () => {
        notifications.show({
          title: "Success",
          message: "Document Signed Successfully",
          color: "green",
        })

        form.reset();
        setSavedSignature("");
        setValue(null);
        signaturePad?.clear();
      },
      onError: (error) => {
        notifications.show({
          title: "Error",
          message: error.message,
          color: "red",
        })
      }
    });
  }


  return (
    <Box>
      <Box className={classes.formBox} mt={80} p={"md"}>
        <form onSubmit={form.onSubmit(handleSignDoc)}>
          <SimpleGrid cols={2}>
            <TextInput
              label="First Name"
              placeholder="John"
              {...form.getInputProps("firstName")}
            />
            <TextInput
              label="Last Name"
              placeholder="Doe"
              {...form.getInputProps("lastName")}
            />
          </SimpleGrid>

          <TextInput
            label="Email"
            placeholder="example@gmail.com"
            mt={"md"}
            {...form.getInputProps("email")}
            withAsterisk={true}
            required={true}
          />
          <FileInput
            // accept="application/pdf"
            label="Upload PDF"
            placeholder="Upload PDF"
            mt={"md"}
            value={value}
            onChange={setValue}
            required={true}
            withAsterisk={true}
          />
          <DigitalSignature
            savedSignature={savedSignature}
            setSavedSignature={setSavedSignature}
            signaturePad={signaturePad}
            setSignaturePad={setSignaturePad}
            signIsEmpty={signIsEmpty}
            setSignIsEmpty={setSignIsEmpty}
          />
          <Flex justify={"flex-end"} align={"center"}>
            <Button
              variant="outline"
              color="#6741d9"
              size="sm"
              mt={'2rem'}
              type="submit"
            >
              Sign Document
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};

export default FormComponent;
