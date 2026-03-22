import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

export default function TaskList({ selectedClient, refreshKey }) {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    if (selectedClient) {
      axios
        .get(`${API_URL}/tasks/${selectedClient.id}`)
        .then((res) => setTasks(res.data))
        .catch((err) => console.error("Failed to load tasks:", err));
    }
  }, [selectedClient, refreshKey]);

  const updateStatus = (id, status) => {
    const newStatus = status === "Pending" ? "Completed" : "Pending";
    axios
      .put(`${API_URL}/tasks/${id}`, { status: newStatus })
      .then(() => {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === id ? { ...task, status: newStatus } : task
          )
        );
      })
      .catch((err) => console.error("Failed to update status:", err));
  };

  const filtered = tasks.filter(
    (task) => statusFilter === "All" || task.status === statusFilter
  );

  return (
    <div>
      <div className="task-controls">
        <h3>Tasks ({filtered.length})</h3>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>Completed</option>
        </select>
      </div>

      {filtered.length === 0 && (
        <p className="no-tasks">
          {tasks.length === 0
            ? "No tasks yet. Add one above."
            : "No tasks match this filter."}
        </p>
      )}

      {filtered.map((task) => {
        const isOverdue =
          new Date(task.due_date) < new Date() && task.status !== "Completed";
        const isCompleted = task.status === "Completed";

        return (
          <div
            key={task.id}
            className={`task-card ${isOverdue ? "overdue" : ""} ${isCompleted ? "completed" : ""}`}
          >
            <div className="task-info">
              <h4>{task.title}</h4>
              <div className="task-meta">
                <span>{task.category}</span>
                <span>Due: {task.due_date}</span>
                <span>Priority: {task.priority || "Medium"}</span>
                <span
                  className={`status-badge ${isCompleted ? "completed-badge" : "pending"}`}
                >
                  {task.status}
                </span>
              </div>
            </div>
            <button
              className="btn-toggle"
              onClick={() => updateStatus(task.id, task.status)}
            >
              {isCompleted ? "Reopen" : "Complete"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
