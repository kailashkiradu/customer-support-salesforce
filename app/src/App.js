// src/App.js
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Tickets from './pages/Tickets';
import Tasks from './pages/Tasks';
import './App.css';
import { useAuth } from './context/AuthContext';

function App() {
  const { role } = useAuth();

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="logo">Customer Support</div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/tickets">Tickets</Link></li>
            <li><Link to="/tasks">Tasks</Link></li>
          </ul>
          <div className="role-display">Role: <strong>{role}</strong></div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
