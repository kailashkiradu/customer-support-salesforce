// src/context/AuthContext.js
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // ───────────────────────────────────────── current user
  const [currentUser, setCurrentUser] = useState(null);

  // ───────────────────────────────────────── users list
  const [users, setUsers] = useState([
    { id: 1, username: "agent1",  role: "agent",   group: "Support Team" },
    { id: 2, username: "mgr1",    role: "manager", group: "Support Team" },
    { id: 3, username: "viewer1", role: "viewer",  group: "Viewers"      }
  ]);

  // login / logout (dummy – replace with real auth later)
  const login  = (userObj) => setCurrentUser(userObj);
  const logout = ()           => setCurrentUser(null);

  // CRUD helpers for users  ──────────────────────────────
  const addUser = (user) =>
    setUsers([...users, { ...user, id: Date.now() }]);

  const updateUser = (updated) =>
    setUsers(users.map(u => (u.id === updated.id ? updated : u)));

  const deleteUser = (id) =>
    setUsers(users.filter(u => u.id !== id));

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        // NEW ↓ – expose user-management helpers
        users,
        addUser,
        updateUser,
        deleteUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
