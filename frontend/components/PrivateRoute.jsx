import { Navigate } from "react-router-dom";
import { useAuth } from "../src/pages/AuthContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  
  if (!user || user.email !== "thxnujay@gmail.com") {
    return <Navigate to="/admin" replace />; // Redirect to admin login
  }

  return children;
}