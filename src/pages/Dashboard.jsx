import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [bugs, setBugs] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
      navigate("/login");
      return;
    }

    fetchBugs(data.user.id);
  };

  const fetchBugs = async (userId) => {
    const { data, error } = await supabase
      .from("bugs")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setBugs(data);
    }
  };

  const addBug = async () => {
    if (!title.trim()) return;

    const { data } = await supabase.auth.getUser();
    const user = data?.user;

    if (!user) return;

    const { error } = await supabase.from("bugs").insert([
      {
        title,
        status: "Open",
        user_id: user.id,
      },
    ]);

    if (!error) {
      setTitle("");
      fetchBugs(user.id);
    }
  };

  const deleteBug = async (id) => {
    await supabase.from("bugs").delete().eq("id", id);

    const { data } = await supabase.auth.getUser();
    const user = data?.user;

    if (user) fetchBugs(user.id);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>☁ Cloud Bug Tracker</h1>

      <button onClick={handleLogout} style={{ marginBottom: "20px" }}>
        Logout
      </button>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter bug title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addBug}>Add Bug</button>
      </div>

      <ul>
        {bugs.length === 0 ? (
          <p>No bugs found.</p>
        ) : (
          bugs.map((bug) => (
            <li key={bug.id}>
              {bug.title} - {bug.status}
              <button onClick={() => deleteBug(bug.id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}