import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";

import Home from "./pages/Home";
import Tickets from "./pages/Tickets";
import Tasks from "./pages/Tasks";
import Queues from "./pages/Queues";
import Login from "./pages/Login";
import UserManagement from "./pages/UserManagement";

import { useAuth } from "./context/AuthContext";

/* ── Lazy-load heavy pages ───────────────────── */
const Dashboard = lazy(() => import("./pages/Dashboard"));

/* ── Guard wrapper ───────────────────────────── */
function ProtectedRoute({ element, roles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) {
    return (
      <div className="main-content" style={{ textAlign: "center" }}>
        <h2>🚫 Access Denied</h2>
        <p>You don’t have permission to view this page.</p>
      </div>
    );
  }
  return element;
}

/* ── Navbar component ───────────────────────── */
function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">Customer&nbsp;Support</div>

      <ul className="nav-links">
        {user ? (
          <>
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/tickets">Tickets</NavLink>
            </li>
            <li>
              <NavLink to="/tasks">Tasks</NavLink>
            </li>
            <li>
              <NavLink to="/queues">Queues</NavLink>
            </li>
            {user.role === "manager" && (
              <li>
                <NavLink to="/users">Users</NavLink>
              </li>
            )}
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
      </ul>

      {user && (
        <div className="role-display">
          Role:&nbsp;<strong>{user.role}</strong>
        </div>
      )}
    </nav>
  );
}

/* ── App root ────────────────────────────────── */
export default function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />

        <main className="main-content">
          <Suspense fallback={<p>Loading…</p>}>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route
                path="/dashboard"
                element={<ProtectedRoute element={<Dashboard />} />}
              />
              <Route
                path="/tickets"
                element={<ProtectedRoute element={<Tickets />} />}
              />
              <Route
                path="/tasks"
                element={<ProtectedRoute element={<Tasks />} />}
              />
              <Route
                path="/queues"
                element={<ProtectedRoute element={<Queues />} />}
              />
              <Route
                path="/users"
                element={
                  <ProtectedRoute
                    element={<UserManagement />}
                    roles={["manager"]}
                  />
                }
              />

              <Route path="/login" element={<Login />} />

              {/* 404 fallback */}
              <Route
                path="*"
                element={
                  <div style={{ textAlign: "center", marginTop: "4rem" }}>
                    <h2>404 – Page Not Found</h2>
                    <NavLink to="/">Go back home</NavLink>
                  </div>
                }
              />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}
