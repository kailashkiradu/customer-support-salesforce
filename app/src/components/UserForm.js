import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function UserForm() {
  const { users, addUser } = useAuth();

  const [form, setForm] = useState({
    username: "",
    role: "agent",
    group: "Support Team",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = form.username.trim();
    if (!username) {
      alert("Username is required");
      return;
    }

    // simple duplicate check
    if (users.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
      alert("Username already exists");
      return;
    }

    addUser({ ...form, username });
    setForm({ username: "", role: "agent", group: "Support Team" });
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="e.g., johndoe"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="role">Role</label>
        <select
          id="role"
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="agent">Agent</option>
          <option value="manager">Manager</option>
          <option value="viewer">Viewer</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="group">Group</label>
        <select
          id="group"
          name="group"
          value={form.group}
          onChange={handleChange}
        >
          <option>Support Team</option>
          <option>Technical Support</option>
          <option>Viewers</option>
          <option>Custom…</option>
        </select>
      </div>

      <button type="submit">Add User</button>
    </form>
  );
}
