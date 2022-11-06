import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppPage from "./pages/AppPage";
import ErrorPage from "./pages/ErrorPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import OutgoingPage from "./pages/OutgoingPage";

const App = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userData")) || ""
  );

  return (
    <Box w="full">
      <Navbar user={user} setUser={setUser} />
      <Box p="4">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/login"
            element={
              !user ? <LoginPage setUser={setUser} /> : <Navigate to="/app" />
            }
          />
          <Route
            path="/app"
            element={user ? <AppPage user={user} /> : <Navigate to="/login" />}
          />
          <Route path="/outgoing" element={<OutgoingPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
