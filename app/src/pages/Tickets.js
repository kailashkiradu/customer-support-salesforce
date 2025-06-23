import { useState } from 'react';
import TicketForm from '../components/TicketForm';
import TicketList from '../components/TicketList';

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchText, setSearchText] = useState('');

  const addTicket = (ticket) => {
    setTickets([...tickets, { ...ticket, id: Date.now() }]);
  };

  const filteredTickets = tickets.filter(ticket => {
    return (
      (!statusFilter || ticket.status === statusFilter) &&
      ticket.customerName.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return (
    <div>
      <h2>Support Tickets</h2>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search by customer"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Closed</option>
        </select>
      </div>
      <TicketForm addTicket={addTicket} />
      <TicketList tickets={filteredTickets} setTickets={setTickets} />
    </div>
  );
}
