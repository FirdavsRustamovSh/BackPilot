import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Logs from "./pages/Logs";
import Login from "./pages/Login";
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

        {/* Можно добавить и другие страницы */}
      </Routes>
    </Router>
  );
}

export default App;
