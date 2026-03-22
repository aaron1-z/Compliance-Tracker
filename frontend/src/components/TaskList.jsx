import { useEffect, useState } from "react";
import axios from "axios";

export default function TaskList({ selectedClient }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (selectedClient) {
      axios
        .get(`http://localhost:5000/tasks/${selectedClient.id}`)
        .then((res) => setTasks(res.data));
    }
  }, [selectedClient]);

  const updateStatus = (id, status) => {
    axios
      .put(`http://localhost:5000/tasks/${id}`, {
        status:
          status === "Pending"
            ? "Completed"
            : "Pending",
      })
      .then(() =>
        setTasks((prev) =>
          prev.map((t) =>
            t.id === id
              ? {
                  ...t,
                  status:
                    status === "Pending"
                      ? "Completed"
                      : "Pending",
                }
              : t
          )
        )
      );
  };

  return (
    <div>
      <h2>Tasks</h2>

      {tasks.map((task) => {
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
                : "#eee",
            }}
          >
            <h4>{task.title}</h4>

            <p>{task.category}</p>

            <p>{task.due_date}</p>

            <p>{task.status}</p>

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