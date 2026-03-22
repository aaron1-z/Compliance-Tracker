import { useState } from "react";
import axios from "axios";

export default function AddTask({
  selectedClient,
}) {
  const [title, setTitle] =
    useState("");

  const [dueDate, setDueDate] =
    useState("");

  const submitTask = () => {
    axios.post(
      "http://localhost:5000/tasks",
      {
        client_id: selectedClient.id,
        title,
        due_date: dueDate,
        status: "Pending",
        category: "Tax",
        priority: "Medium",
      }
    );
  };

  return (
    <div>
      <h3>Add Task</h3>

      <input
        placeholder="Title"
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <input
        type="date"
        onChange={(e) =>
          setDueDate(e.target.value)
        }
      />

      <button onClick={submitTask}>
        Add Task
      </button>
    </div>
  );
}