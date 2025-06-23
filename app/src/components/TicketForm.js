// src/components/TicketForm.js
import { useState } from "react";

export default function TicketForm({ addTicket }) {
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    issueType: "",
    priority: "Medium",
    status: "Open",
    assignedTo: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTicket = {
      ...form,
      id: Date.now(),
      ticketNumber: `TCK-${Date.now().toString().slice(-5)}`, // generate unique ticket number
    };
    addTicket(newTicket);
    setForm({
      customerName: "",
      email: "",
      phone: "",
      issueType: "",
      priority: "Medium",
      status: "Open",
      assignedTo: "",
      description: "",
    });
  };

  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      <h3>Create Support Ticket</h3>

      <input
        name="customerName"
        placeholder="Customer Name"
        value={form.customerName}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Customer Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
      />

      <input
        name="issueType"
        placeholder="Issue Type (e.g., Login issue, Billing)"
        value={form.issueType}
        onChange={handleChange}
        required
      />

      <select name="priority" value={form.priority} onChange={handleChange}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        <option>Critical</option>
      </select>

      <select name="status" value={form.status} onChange={handleChange}>
        <option>Open</option>
        <option>In Progress</option>
        <option>Resolved</option>
        <option>Closed</option>
      </select>

      <input
        name="assignedTo"
        placeholder="Assigned To (optional)"
        value={form.assignedTo}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Issue Description"
        value={form.description}
        onChange={handleChange}
        rows="4"
      />

      <button type="submit">Add Ticket</button>
    </form>
  );
}
