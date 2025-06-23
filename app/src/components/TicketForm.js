import { useState } from 'react';

export default function TicketForm({ addTicket }) {
  const [form, setForm] = useState({
    customerName: '',
    email: '',
    issueType: 'Technical',
    priority: 'Medium',
    status: 'Open',
    description: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTicket({ ...form, id: Date.now() });
    setForm({
      customerName: '',
      email: '',
      issueType: 'Technical',
      priority: 'Medium',
      status: 'Open',
      description: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input type="text" name="customerName" placeholder="Customer Name" value={form.customerName} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <select name="issueType" value={form.issueType} onChange={handleChange}>
        <option value="Technical">Technical</option>
        <option value="Billing">Billing</option>
        <option value="General">General</option>
      </select>
      <select name="priority" value={form.priority} onChange={handleChange}>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <button type="submit">Add Ticket</button>
    </form>
  );
}
