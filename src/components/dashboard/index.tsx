import { Box, Button, Tabs, Title } from "@mantine/core";
import FormComponent from "./FormComponent";
import DocumentList from "./DocumentList";
import { IconLogout } from "@tabler/icons-react";
import { Navigate, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  if (!localStorage.getItem("access_token")) {
    return <Navigate to="/" />;
  }


  return (
    <Box>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "3rem",
        maxWidth: "75%",
        margin: "auto"
      }}>
        <Title order={2} ta={"center"} mt={"md"}>
          Hello User!
        </Title>
        <Button variant="outline" color="tomato" size="sm" mt={"md"}
          leftSection={<IconLogout size={20} />}
          onClick={() => {
            localStorage.removeItem("access_token");
            navigate("/");
          }}
        >
          Logout
        </Button>
      </div>
      <Box w={"80%"} m={"auto"} my={"lg"}>
        <Tabs defaultValue="form" color={"violet"}>
          <Tabs.List>
            <Tabs.Tab value="form">Document Signed Form</Tabs.Tab>
            <Tabs.Tab value="documentList">Document List</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="form">
            <Box mt={"md"}>
              <FormComponent />
            </Box>
          </Tabs.Panel>
          <Tabs.Panel value="documentList">
            <Box mt={"md"}>
              <DocumentList />
            </Box>
          </Tabs.Panel>
        </Tabs>
      </Box>
    </Box >
  );
};

export default Dashboard;
