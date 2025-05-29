import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Logs from "./pages/logs";
import Login from "./pages/login";
import Database from "./pages/Database";
import Bot from "./pages/Bot";
import DashboardLayout from "./components/Dashboard";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route path="/" element={<Login />} />

        {/* Protected routes inside Dashboard layout */}
        <Route
          path="/logs"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Logs />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/database"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Database />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/bot"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Bot />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        {/* Можно добавить и другие страницы */}
      </Routes>
    </Router>
  );
}

export default App;
