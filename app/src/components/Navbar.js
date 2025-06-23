import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const role = currentUser?.role;

  return (
    <nav className="navbar">
      <div className="logo">Customer Support</div>

      <ul className="nav-links">
        {currentUser ? (
          <>
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            <li><NavLink to="/tickets">Tickets</NavLink></li>
            <li><NavLink to="/tasks">Tasks</NavLink></li>
            <li><NavLink to="/queues">Queues</NavLink></li>
            {role === "manager" && (
              <li><NavLink to="/users">Users</NavLink></li>
            )}
            <li><button onClick={logout} className="logout-btn">Logout</button></li>
          </>
        ) : (
          <li><NavLink to="/login">Login</NavLink></li>
        )}
      </ul>

      {currentUser && (
        <div className="role-display">Role: <strong>{role}</strong></div>
      )}
    </nav>
  );
}
