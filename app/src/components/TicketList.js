import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function TicketList({ tickets, setTickets }) {
  const { role, user } = useAuth();

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  /* ───────── helpers ───────── */
  const startEdit = (t) => {
    setEditingId(t.id);
    setEditForm({ ...t });
  };

  const saveEdit = () => {
    setTickets(tickets.map((t) => (t.id === editingId ? editForm : t)));
    setEditingId(null);
    setEditForm({});
  };

  const deleteTicket = (id) => {
    setTickets(tickets.filter((t) => t.id !== id));
  };

  const claimTicket = (ticketId) => {
    setTickets(
      tickets.map((t) =>
        t.id === ticketId ? { ...t, assignedTo: user.username } : t
      )
    );
  };

  const onChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  /* ───────── UI ───────── */
  if (tickets.length === 0)
    return <p style={{ textAlign: "center" }}>No tickets yet.</p>;

  return (
    <div className="ticket-list">
      {tickets.map((t) =>
        t.id === editingId ? (
          /* ── Edit mode ─────────────────────── */
          <div key={t.id} className="ticket-card">
            <div className="form-group">
              <label>Customer Name</label>
              <input
                name="customerName"
                value={editForm.customerName}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select name="status" value={editForm.status} onChange={onChange}>
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>
            </div>

            {role === "manager" && (
              <>
                <div className="form-group">
                  <label>Priority</label>
                  <select
                    name="priority"
                    value={editForm.priority}
                    onChange={onChange}
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Resolution Notes</label>
                  <textarea
                    name="resolutionNotes"
                    rows="3"
                    value={editForm.resolutionNotes || ""}
                    onChange={onChange}
                  />
                </div>
              </>
            )}

            <div style={{ marginTop: "0.6rem" }}>
              <button onClick={saveEdit}>Save</button>
              <button
                onClick={() => {
                  setEditingId(null);
                  setEditForm({});
                }}
                style={{ marginLeft: "0.5rem" }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* ── Read-only card ─────────────────── */
          <div key={t.id} className="ticket-card">
            <div className="ticket-header">
              <strong>{t.customerName}</strong>{" "}
              <span style={{ color: "#777", fontSize: "0.9rem" }}>
                ({t.ticketNumber})
              </span>
              <span className={`status ${t.status.replace(/\s/g, "")}`}>
                {t.status}
              </span>
            </div>

            <p>
              <strong>Issue:</strong> {t.issueType}
            </p>
            <p>
              <strong>Email:</strong> {t.email}
            </p>
            <p>
              <strong>Description:</strong> {t.description}
            </p>
            <p>
              <strong>Assigned To:</strong>{" "}
              {t.assignedTo || <em>Unassigned</em>}
            </p>

            {role === "manager" && (
              <>
                <p>
                  <strong>Priority:</strong> {t.priority}
                </p>
                {t.resolutionNotes && (
                  <p>
                    <strong>Resolution Notes:</strong> {t.resolutionNotes}
                  </p>
                )}
              </>
            )}

            {/* action buttons */}
            <div style={{ marginTop: "0.6rem" }}>
              <button onClick={() => startEdit(t)}>Edit</button>
              <button
                onClick={() => deleteTicket(t.id)}
                style={{ marginLeft: "0.5rem" }}
              >
                Delete
              </button>

              {role === "agent" && !t.assignedTo && (
                <button
                  onClick={() => claimTicket(t.id)}
                  style={{ marginLeft: "0.5rem" }}
                >
                  Claim
                </button>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}
