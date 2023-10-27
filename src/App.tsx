import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider } from "@mantine/core";
import Login from "./components/login";
import { Route, Routes } from "react-router-dom";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <QueryClientProvider client={new QueryClient()}>
        <Notifications zIndex={1000} />
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
