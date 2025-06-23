import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  /* ───────────── Current logged-in user ───────────── */
  const [user, setUser] = useState(null);

  /* ───────────── List of all users ───────────── */
  const [users, setUsers] = useState([
    { id: 1, username: "agent1",  role: "agent",   group: "Support Team" },
    { id: 2, username: "mgr1",    role: "manager", group: "Support Team" },
    { id: 3, username: "viewer1", role: "viewer",  group: "Viewers"      }
  ]);

  /* ───────────── Login / Logout ───────────── */
  const login = ({ username, role }) => {
    /* ----- Simple version: accepts anything ----- */
    setUser({ username, role });

    /* ----- If you want to validate against user list, replace with: -----
    const found = users.find(
      u => u.username === username && u.role === role
    );
    if (found) setUser(found);
    else alert("User not found. Add it first in User Management.");
    -------------------------------------------------------------------- */
  };

  const logout = () => setUser(null);

  /* ───────────── User CRUD helpers ───────────── */
  const addUser = (newUser) =>
    setUsers([...users, { ...newUser, id: Date.now() }]);

  const updateUser = (updated) =>
    setUsers(users.map(u => (u.id === updated.id ? updated : u)));

  const deleteUser = (id) =>
    setUsers(users.filter(u => u.id !== id));

  /* ───────────── Context Value ───────────── */
  return (
    <AuthContext.Provider
      value={{
        user,          // <─ renamed
        login,
        logout,
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
