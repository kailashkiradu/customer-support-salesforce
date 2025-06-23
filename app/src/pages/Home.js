// src/pages/Home.js
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { role, setRole, user } = useAuth();

  return (
    <div className="home-page">
      <h1>🎧 Welcome to the Customer Support System</h1>
      <p style={{ marginTop: "0.5rem", color: "#555" }}>
        This application helps you manage customer support tickets and tasks efficiently.
        Access dashboards, assign tickets, and track resolutions — all in one place.
      </p>

      <div className="role-switcher">
        <label htmlFor="roleSelect">Switch Role:</label>
        <select
          id="roleSelect"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="agent">Support Agent</option>
          <option value="manager">Support Manager</option>
          <option value="viewer">Viewer</option>
        </select>
      </div>

      <div style={{ marginTop: "1.5rem", fontSize: "0.95rem", color: "#777" }}>
        Logged in as: <strong>{user?.username || "Guest"}</strong> ({role})
      </div>
    </div>
  );
}
