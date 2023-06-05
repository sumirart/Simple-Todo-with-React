import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedPage from "./pages/ProtectedPage";

import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Todo from "./pages/Todo";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar />}>
          <Route element={<ProtectedPage />}>
            <Route path="/todos" element={<Todo />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
