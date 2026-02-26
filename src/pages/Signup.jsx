import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { error } = await superclient.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      navigate("/dashboard");
    } else {
      alert(error.message);
    }
  };

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (!error) {
      alert("Check your email to confirm signup");
    } else {
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup} style={{ marginLeft: "10px" }}>
        Sign Up
      </button>
    </div>
  );
}