import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#333', color: '#fff' }}>
      <Link to="/" style={{ marginRight: 10, color: '#fff' }}>Home</Link>
      <Link to="/tickets" style={{ marginRight: 10, color: '#fff' }}>Tickets</Link>
      <Link to="/tasks" style={{ color: '#fff' }}>Tasks</Link>
    </nav>
  );
}
