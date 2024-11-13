import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import CreateTask from "./pages/createTask";
import EditTask from "./pages/EditTask";

function App() {
  // useEffect(() => {
  //   // تفعيل الميزات المستقبلية لـ React Router
  //   window.__REACT_ROUTER_FLAGS__ = {
  //     v7_startTransition: true,
  //     v7_relativeSplatPath: true,
  //   };
  // }, []);

  return (
    // <BrowserRouter>
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/:userId" element={<Dashboard />} />
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/tasks/:userId/:taskId" element={<EditTask />} />
        <Route path="/" element={<h1>Welcome to Task Manager</h1>} />
      </Routes>
    </Router>
    // </BrowserRouter>
  );
}

export default App;
