import {
  Box,
  Button,
  Divider,
  Flex,
  PasswordInput,
  SimpleGrid,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterType, zRegister } from "../../types/auth";
import classes from "./register.module.css";
import { useRegister } from "./useRegister";

const Register = () => {
  const navigate = useNavigate();

  const form = useForm<RegisterType>({
    validate: zodResolver(zRegister),
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  });

  const { mutate } = useRegister();

  const handleRegisterSubmit = async (values: RegisterType) => {
    mutate(values, {
      onSuccess: () => {
        navigate("/");
      },
      onError: () => {
        notifications.show({
          autoClose: 4000,
          message: "Invalid email or password, please try again.",
          color: "red",
          icon: <IconX />,
          style: (theme) => ({ backgroundColor: theme.colors.red[0] }),
          withBorder: true,
        });
      },
    });
  };

  return (
    <Box>
      <Flex align={"center"} justify={"center"} h={"100vh"}>
        <Box className={classes.registerBox} p={"lg"}>
          <form onSubmit={form.onSubmit(handleRegisterSubmit)}>
            <Title order={1} ta={"center"}>
              REGISTER
            </Title>
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
            />
            <PasswordInput
              label="Password"
              placeholder="********"
              mt={"md"}
              {...form.getInputProps("password")}
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="********"
              mt={"md"}
              {...form.getInputProps("confirmPassword")}
            />

            <Flex justify={"flex-end"} align={"center"}>
              <Button
                variant="outline"
                color="#6741d9"
                size="sm"
                mt={"md"}
                type="submit"
              >
                Register
              </Button>
            </Flex>
            <Divider
              my="xs"
              label={
                <Link to="/" className={classes.createAccountLink}>
                  Already have an account ?
                </Link>
                //   <Anchor href="#" c="violet" fz={"sm"}>
                //     Create a new account
                //   </Anchor>
              }
            />
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default Register;
