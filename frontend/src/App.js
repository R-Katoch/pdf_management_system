import React from "react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Container maxWidth={false}>
      <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
    </Container>
  );
};

export default App;
