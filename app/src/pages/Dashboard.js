import { useAuth } from "../context/AuthContext";
import ChartCard from "../components/ChartCard";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="main-content">
      <h2>Welcome, {user?.username || "User"}!</h2>
      <p style={{ marginBottom: "2rem" }}>
        Here’s a quick overview of your support activities.
      </p>

      <div className="dashboard-grid">
        <ChartCard title="Tickets by Status" data={[20, 15, 5, 10]} />
        <ChartCard title="Tasks by Status" data={[12, 8, 14]} />
        <ChartCard title="High Priority Tickets" data={[5]} />
        <ChartCard title="Average Resolution Time" data={[2.4]} />
      </div>
    </div>
  );
}
