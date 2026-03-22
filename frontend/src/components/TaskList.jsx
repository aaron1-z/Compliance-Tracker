import { useEffect, useState } from "react";
import axios from "axios";

export default function TaskList({ selectedClient }) {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    if (selectedClient) {
      axios
        .get(`http://localhost:5000/tasks/${selectedClient.id}`)
        .then((res) => setTasks(res.data))
        .catch((err) => console.error(err));
    }
  }, [selectedClient]);

  const updateStatus = (id, status) => {
    const newStatus =
      status === "Pending" ? "Completed" : "Pending";

    axios
      .put(`http://localhost:5000/tasks/${id}`, {
        status: newStatus,
      })
      .then(() => {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === id
              ? { ...task, status: newStatus }
              : task
          )
        );
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Tasks</h2>

      {/* Status Filter Dropdown */}
      <select
        onChange={(e) =>
          setStatusFilter(e.target.value)
        }
        style={{ marginBottom: "10px" }}
      >
        <option>All</option>
        <option>Pending</option>
        <option>Completed</option>
      </select>

      {/* Task List */}
      {tasks
        .filter(
          (task) =>
            statusFilter === "All" ||
            task.status === statusFilter
        )
        .map((task) => {
          const isOverdue =
            new Date(task.due_date) < new Date() &&
            task.status !== "Completed";

          return (
            <div
              key={task.id}
              style={{
                border: "1px solid gray",
                margin: "8px",
                padding: "8px",
                backgroundColor: isOverdue
                  ? "#ffcccc"
                  : "#eeeeee",
              }}
            >
              <h4>{task.title}</h4>

              <p>
                <strong>Category:</strong>{" "}
                {task.category}
              </p>

              <p>
                <strong>Due Date:</strong>{" "}
                {task.due_date}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {task.status}
              </p>

              <button
                onClick={() =>
                  updateStatus(
                    task.id,
                    task.status
                  )
                }
              >
                Toggle Status
              </button>
            </div>
          );
        })}
    </div>
  );
}