import { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchText, setSearchText] = useState("");

  /* ── Add Task ─────────────────────────────────────────────── */
  const addTask = (task) =>
    setTasks([...tasks, { ...task, id: Date.now() }]);

  /* ── Apply Filters ────────────────────────────────────────── */
  const filteredTasks = tasks.filter((t) => {
    const matchesStatus = !statusFilter || t.status === statusFilter;
    const assignee = (t.assignedTo || "").toLowerCase();
    const matchesSearch = assignee.includes(searchText.trim().toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="main-content">
      <h2>📋 Support Tasks</h2>

      {/* ── Filter Bar ─────────────────────────── */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by assignee"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option>Not Started</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <span className="task-count">
          Showing&nbsp;<strong>{filteredTasks.length}</strong>&nbsp;/
          {tasks.length} tasks
        </span>
      </div>

      {/* ── Create Form + List ─────────────────── */}
      <TaskForm addTask={addTask} />
      {filteredTasks.length ? (
        <TaskList tasks={filteredTasks} setTasks={setTasks} />
      ) : (
        <p style={{ textAlign: "center", color: "#777" }}>
          No tasks match current filters.
        </p>
      )}
    </div>
  );
}
