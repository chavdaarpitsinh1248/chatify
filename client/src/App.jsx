import { useState } from "react";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ChatApp from "./ChatApp";


function AppContent() {
  const { user } = useAuth();
  const [mode, setMode] = useState("login");

  if (!user)
    return mode === "login" ? (
      <Login />
    ) : (
      <Register />
    );

  return <ChatApp />;
}
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}