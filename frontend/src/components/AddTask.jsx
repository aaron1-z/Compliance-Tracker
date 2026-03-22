import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

export default function AddTask({ selectedClient, onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("Tax");
  const [priority, setPriority] = useState("Medium");
  const [submitting, setSubmitting] = useState(false);

  const submitTask = () => {
    if (!title.trim() || !dueDate) return;

    setSubmitting(true);
    axios
      .post(`${API_URL}/tasks`, {
        client_id: selectedClient.id,
        title: title.trim(),
        description: "",
        due_date: dueDate,
        status: "Pending",
        category,
        priority,
      })
      .then(() => {
        setTitle("");
        setDueDate("");
        setCategory("Tax");
        setPriority("Medium");
        onTaskAdded?.();
      })
      .catch((err) => console.error("Failed to add task:", err))
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="add-task-card">
      <h3>Add Task</h3>
      <div className="form-row">
        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Tax</option>
          <option>Audit</option>
          <option>Legal</option>
          <option>Regulatory</option>
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button
          className="btn-primary"
          onClick={submitTask}
          disabled={!title.trim() || !dueDate || submitting}
        >
          {submitting ? "Adding..." : "Add Task"}
        </button>
      </div>
    </div>
  );
}
