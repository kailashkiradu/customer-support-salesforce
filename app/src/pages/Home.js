// src/pages/Home.js
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { role, setRole } = useAuth();

  return (
    <div className="home-page">
      <h1>Welcome to the Customer Support System</h1>
      <div className="role-switcher">
        <label>Switch Role: </label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="agent">Support Agent</option>
          <option value="manager">Support Manager</option>
        </select>
      </div>
    </div>
  );
}
