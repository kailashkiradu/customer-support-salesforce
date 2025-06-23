// src/pages/Tasks.js
import { useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchText, setSearchText] = useState('');

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const filteredTasks = tasks.filter(task => {
    return (
      (!statusFilter || task.status === statusFilter) &&
      task.assignedTo.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return (
    <div>
      <h2>Support Tasks</h2>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search by assignee"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option>Not Started</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>
      <TaskForm addTask={addTask} />
      <TaskList tasks={filteredTasks} setTasks={setTasks} />
    </div>
  );
}
