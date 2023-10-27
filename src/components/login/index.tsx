import {
  Anchor,
  Box,
  Button,
  Divider,
  Flex,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { LoginType, zLogin } from "../../types/auth";
import classes from "./login.module.css";
import { useLogin } from "./useLogin";

const Login = () => {
  const navigate = useNavigate();

  const form = useForm<LoginType>({
    validate: zodResolver(zLogin),
    initialValues: {
      email: "",
      password: "",
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  });

  const { mutate } = useLogin();

  const handleLoginSubmit = async (values: LoginType) => {
    mutate(values, {
      onSuccess: () => {
        navigate("/dashboard");
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
        <Box className={classes.loginBox} p={"lg"}>
          <form onSubmit={form.onSubmit(handleLoginSubmit)}>
            <Title order={1} ta={"center"}>
              LOGIN
            </Title>
            <TextInput
              label="Email"
              placeholder="example@gmail.com"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="********"
              mt={"md"}
              {...form.getInputProps("password")}
            />

            <Flex justify={"space-between"} align={"center"}>
              <Anchor href="#" c="violet">
                Forgot Password ?
              </Anchor>
              <Button
                variant="outline"
                color="#6741d9"
                size="sm"
                mt={"md"}
                type="submit"
              >
                Login
              </Button>
            </Flex>
            <Divider
              my="xs"
              label={
                <Link to="/register" className={classes.createAccountLink}>
                  Create a new account
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

export default Login;
