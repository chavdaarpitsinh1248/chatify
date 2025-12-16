import { useState } from "react";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ChatApp from "./ChatApp";

function AppContent() {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="p-6 border rounded-lg w-80">
          {showLogin ? (
            <Login onSwitch={() => setShowLogin(false)} />
          ) : (
            <Register onSwitch={() => setShowLogin(true)} />
          )}
        </div>
      </div>
    );
  }

  return <ChatApp />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
