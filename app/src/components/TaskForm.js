import { useState } from "react";

export default function TaskForm({ addTask }) {
  const [form, setForm] = useState({
    taskName: "",
    relatedTicket: "",
    assignedTo: "",
    dueDate: "",
    status: "Not Started",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ ...form, id: Date.now() });
    setForm({
      taskName: "",
      relatedTicket: "",
      assignedTo: "",
      dueDate: "",
      status: "Not Started",
    });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>Add New Task</h3>

      <div className="form-group">
        <label htmlFor="taskName">Task Name</label>
        <input
          id="taskName"
          name="taskName"
          value={form.taskName}
          onChange={handleChange}
          required
          placeholder="Enter task name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="relatedTicket">Related Ticket ID</label>
        <input
          id="relatedTicket"
          name="relatedTicket"
          value={form.relatedTicket}
          onChange={handleChange}
          placeholder="e.g., TKT-00001"
        />
      </div>

      <div className="form-group">
        <label htmlFor="assignedTo">Assigned To</label>
        <input
          id="assignedTo"
          name="assignedTo"
          value={form.assignedTo}
          onChange={handleChange}
          placeholder="Assignee's name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option>Not Started</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      <button type="submit">Add Task</button>
    </form>
  );
}
