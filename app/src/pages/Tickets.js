import { useState } from "react";
import TicketForm from "../components/TicketForm";
import TicketList from "../components/TicketList";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchText, setSearchText] = useState("");

  const addTicket = (ticket) =>
    setTickets([...tickets, { ...ticket, id: Date.now() }]);

  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus = !statusFilter || ticket.status === statusFilter;
    const name = (ticket.customerName || "").toLowerCase();
    const matchesSearch = name.includes(searchText.trim().toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="main-content">
      <h2>🎫 Support Tickets</h2>

      {/* ── Filter bar ── */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by customer"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Closed</option>
        </select>

        <span className="task-count">
          Showing&nbsp;<strong>{filteredTickets.length}</strong>&nbsp;/&nbsp;
          {tickets.length} tickets
        </span>
      </div>

      <TicketForm addTicket={addTicket} />
      {filteredTickets.length ? (
        <TicketList tickets={filteredTickets} setTickets={setTickets} />
      ) : (
        <p style={{ textAlign: "center", color: "#777" }}>
          No tickets match current filters.
        </p>
      )}
    </div>
  );
}
