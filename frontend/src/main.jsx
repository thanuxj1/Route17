// src/main.jsx
import './index.css';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./pages/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />  {/* ✅ Let Navbar go inside App, where Router is */}
    </AuthProvider>
  </React.StrictMode>
);
