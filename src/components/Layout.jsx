import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.title}>🐞 Bug Tracker</h2>

        <Link to="/dashboard" style={styles.link}>
          Dashboard
        </Link>

        <Link to="/login" style={styles.link}>
          Login
        </Link>
      </div>

      <div style={styles.content}>
        {children}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
  },
  sidebar: {
    width: "220px",
    backgroundColor: "#1f2937",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  title: {
    color: "white",
    marginBottom: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    padding: "8px",
    borderRadius: "4px",
    backgroundColor: "#374151",
  },
  content: {
    flex: 1,
    padding: "30px",
    backgroundColor: "#f3f4f6",
  },
};