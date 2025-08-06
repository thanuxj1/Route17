import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/AdminDashboard";
import UserBusView from "./pages/UserBusView";
import Login from "./pages/Login";
import Navbar from "../components/Navbar";
import PrivateRoute from "../components/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<UserBusView />} />

        {/* ADMIN AUTH ROUTES */}
        <Route path="/admin" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Redirect old secret route */}
        <Route path="/secret-dashboard-179" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;