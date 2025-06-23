// src/pages/UserManagement.js
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";

export default function UserManagement() {
  const { user } = useAuth(); // changed from currentUser → user for consistency

  // ⛔ Only allow managers
  if (!user || user.role !== "manager") {
    return (
      <div className="main-content" style={{ textAlign: "center", color: "#777" }}>
        <h2>🚫 Access Denied</h2>
        <p>You must be a manager to view the User Management Panel.</p>
      </div>
    );
  }

  return (
    <div className="main-content">
      <h2>👥 User Management</h2>
      <p style={{ marginBottom: "1rem", color: "#555" }}>
        Add users, assign roles, and manage access to the system.
      </p>
      
      <UserForm />
      <hr style={{ margin: "2rem 0" }} />
      <UserTable />
    </div>
  );
}
