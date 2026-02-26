import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/dashboard"
        element={
          session ? <Dashboard /> : <Navigate to="/login" replace />
        }
      />

      {/* Default route */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;