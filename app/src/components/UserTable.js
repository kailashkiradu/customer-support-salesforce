// src/components/UserTable.js
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function UserTable() {
  const { users, updateUser, deleteUser } = useAuth();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const startEdit = (user) => {
    setEditingId(user.id);
    setEditForm({ ...user });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    if (!editForm.username.trim()) {
      alert("Username cannot be empty");
      return;
    }
    updateUser(editForm);
    setEditingId(null);
  };

  const handleChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  if (!users.length) return <p>No users available.</p>;

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Role</th>
          <th>Group</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => {
          const uid = u.id || `${u.username}_${u.role}`;
          return editingId === u.id ? (
            <tr key={uid}>
              <td>
                <input
                  name="username"
                  value={editForm.username}
                  onChange={handleChange}
                />
              </td>
              <td>
                <select
                  name="role"
                  value={editForm.role}
                  onChange={handleChange}
                >
                  <option value="agent">Agent</option>
                  <option value="manager">Manager</option>
                  <option value="viewer">Viewer</option>
                </select>
              </td>
              <td>
                <input
                  name="group"
                  value={editForm.group}
                  onChange={handleChange}
                />
              </td>
              <td className="button-group">
                <button onClick={saveEdit}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </td>
            </tr>
          ) : (
            <tr key={uid}>
              <td>{u.username}</td>
              <td>{u.role}</td>
              <td>{u.group}</td>
              <td className="button-group">
                <button onClick={() => startEdit(u)}>Edit</button>
                <button onClick={() => deleteUser(u.id)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
