import { useState } from 'react';

export default function TaskList({ tasks, setTasks }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditClick = (task) => {
    setEditingId(task.id);
    setEditForm({ ...task });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    setTasks(tasks.map(task => (task.id === editingId ? editForm : task)));
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p style={{ textAlign: "center" }}>No tasks added yet.</p>
      ) : (
        tasks.map((task) =>
          editingId === task.id ? (
            <div key={task.id} className="task-card">
              <div className="form-group">
                <label>Task Name</label>
                <input
                  name="taskName"
                  value={editForm.taskName}
                  onChange={handleEditChange}
                />
              </div>
              <div className="form-group">
                <label>Related Ticket</label>
                <input
                  name="relatedTicket"
                  value={editForm.relatedTicket}
                  onChange={handleEditChange}
                />
              </div>
              <div className="form-group">
                <label>Assigned To</label>
                <input
                  name="assignedTo"
                  value={editForm.assignedTo}
                  onChange={handleEditChange}
                />
              </div>
              <div className="form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={editForm.dueDate}
                  onChange={handleEditChange}
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={editForm.status}
                  onChange={handleEditChange}
                >
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
              <div style={{ marginTop: "0.5rem" }}>
                <button onClick={handleUpdate}>Save</button>
                <button onClick={handleCancel} style={{ marginLeft: "0.5rem" }}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div key={task.id} className="task-card">
              <div className="task-header">
                <strong>{task.taskName}</strong>
                <span className={`status ${task.status.replace(/\s/g, '')}`}>
                  {task.status}
                </span>
              </div>
              <p><strong>Related Ticket:</strong> {task.relatedTicket}</p>
              <p><strong>Assigned To:</strong> {task.assignedTo}</p>
              <p><strong>Due Date:</strong> {task.dueDate}</p>
              <div style={{ marginTop: "0.5rem" }}>
                <button onClick={() => handleEditClick(task)}>Edit</button>
                <button onClick={() => handleDelete(task.id)} style={{ marginLeft: "0.5rem" }}>
                  Delete
                </button>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
}
