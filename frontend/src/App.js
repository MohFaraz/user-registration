import React, { useState } from "react";
import Register from "./register";
import Login from "./Login";
import "./App.css";
import Profile from "./Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [token, setToken] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route path="/login" element={<Login setToken={setToken} />}></Route>
        <Route path="/profile" element={<Profile token={token} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
