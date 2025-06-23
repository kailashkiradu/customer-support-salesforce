// src/components/TaskList.js
import { useState } from 'react';

export default function TaskList({ tasks, setTasks }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleEditClick = (task) => {
    setEditingId(task.id);
    setEditForm(task);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    setTasks(tasks.map(t => (t.id === editingId ? editForm : t)));
    setEditingId(null);
  };

  return (
    <div className="ticket-list">
      {tasks.map(task =>
        editingId === task.id ? (
          <div key={task.id} className="ticket-card">
            <input name="taskName" value={editForm.taskName} onChange={handleEditChange} />
            <input name="relatedTicket" value={editForm.relatedTicket} onChange={handleEditChange} />
            <input name="assignedTo" value={editForm.assignedTo} onChange={handleEditChange} />
            <input name="dueDate" type="date" value={editForm.dueDate} onChange={handleEditChange} />
            <select name="status" value={editForm.status} onChange={handleEditChange}>
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setEditingId(null)}>Cancel</button>
          </div>
        ) : (
          <div key={task.id} className="ticket-card">
            <div className="ticket-header">
              <strong>{task.taskName}</strong>
              <span className="status">{task.status}</span>
            </div>
            <p><strong>Related Ticket:</strong> {task.relatedTicket}</p>
            <p><strong>Assigned To:</strong> {task.assignedTo}</p>
            <p><strong>Due Date:</strong> {task.dueDate}</p>
            <button onClick={() => handleEditClick(task)}>Edit</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </div>
        )
      )}
    </div>
  );
}
