// src/components/TicketList.js
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function TicketList({ tickets, setTickets }) {
  const { role } = useAuth();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleDelete = (id) => {
    setTickets(tickets.filter(t => t.id !== id));
  };

  const handleEditClick = (ticket) => {
    setEditingId(ticket.id);
    setEditForm(ticket);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    setTickets(tickets.map(t => (t.id === editingId ? editForm : t)));
    setEditingId(null);
  };

  return (
    <div className="ticket-list">
      {tickets.map(ticket =>
        editingId === ticket.id ? (
          <div key={ticket.id} className="ticket-card">
            <input name="customerName" value={editForm.customerName} onChange={handleEditChange} />
            <select name="status" value={editForm.status} onChange={handleEditChange}>
              <option>Open</option><option>In Progress</option><option>Resolved</option><option>Closed</option>
            </select>
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setEditingId(null)}>Cancel</button>
          </div>
        ) : (
          <div key={ticket.id} className="ticket-card">
            <div className="ticket-header">
              <strong>{ticket.customerName}</strong> — <span>{ticket.issueType}</span>
              <span className="status">{ticket.status}</span>
            </div>
            <p><strong>Email:</strong> {ticket.email}</p>
            <p><strong>Description:</strong> {ticket.description}</p>
            <p><strong>Assigned To:</strong> {ticket.assignedTo}</p>
            {role === 'manager' && (
              <>
                <p><strong>Priority:</strong> {ticket.priority}</p>
                <p><strong>Resolution Notes:</strong> {ticket.resolutionNotes}</p>
              </>
            )}
            <button onClick={() => handleEditClick(ticket)}>Edit</button>
            <button onClick={() => handleDelete(ticket.id)}>Delete</button>
          </div>
        )
      )}
    </div>
  );
}
