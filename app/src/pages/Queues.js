import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const mockHighPriorityTickets = [
  { id: 1, number: "TKT-00001", customer: "John Doe", issue: "Login error", status: "Open", assignedTo: null },
  { id: 2, number: "TKT-00002", customer: "Jane Smith", issue: "Billing mismatch", status: "Open", assignedTo: null },
  { id: 3, number: "TKT-00003", customer: "Alice", issue: "Crash on load", status: "In Progress", assignedTo: "Agent1" },
];

export default function Queues() {
  const { user, role } = useAuth();
  const [tickets, setTickets] = useState(mockHighPriorityTickets);

  const claimTicket = (ticketId) => {
    const updated = tickets.map(t =>
      t.id === ticketId ? { ...t, assignedTo: user?.username || "Agent" } : t
    );
    setTickets(updated);
  };

  return (
    <div className="main-content">
      <h2>🚨 High Priority Ticket Queue</h2>
      <p>These tickets are marked as <strong>High Priority</strong> and need immediate attention.</p>

      <div className="ticket-list">
        {tickets
          .filter(t => t.status !== "Closed" && t.priority !== "Low")
          .map(ticket => (
            <div key={ticket.id} className="ticket-card">
              <div className="ticket-header">
                <span>{ticket.number} - {ticket.customer}</span>
                <span className={`status ${ticket.status.replace(" ", "")}`}>{ticket.status}</span>
              </div>
              <p><strong>Issue:</strong> {ticket.issue}</p>
              <p><strong>Assigned To:</strong> {ticket.assignedTo || "Unassigned"}</p>

              {role === "agent" && !ticket.assignedTo && (
                <button onClick={() => claimTicket(ticket.id)}>Claim Ticket</button>
              )}

              {role === "manager" && (
                <button disabled style={{ background: "#ccc", cursor: "not-allowed" }}>
                  Manager Override (Coming Soon)
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
