// src/components/TaskForm.js
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function TaskForm({ addTask }) {
  const { role } = useAuth();
  const [form, setForm] = useState({
    taskName: '',
    relatedTicket: '',
    assignedTo: '',
    dueDate: '',
    status: 'Not Started'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(form);
    setForm({
      taskName: '',
      relatedTicket: '',
      assignedTo: '',
      dueDate: '',
      status: 'Not Started'
    });
  };

  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      <input name="taskName" placeholder="Task Name" value={form.taskName} onChange={handleChange} required />
      <input name="relatedTicket" placeholder="Related Ticket ID" value={form.relatedTicket} onChange={handleChange} />
      <input name="assignedTo" placeholder="Assigned To" value={form.assignedTo} onChange={handleChange} />
      <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} />
      <select name="status" value={form.status} onChange={handleChange}>
        <option>Not Started</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}
