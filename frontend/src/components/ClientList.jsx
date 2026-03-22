import { useEffect, useState } from "react";
import axios from "axios";

export default function ClientList({ selectedClient, setClient }) {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/clients")
      .then((res) => setClients(res.data))
      .catch((err) => {
        console.error("Failed to load clients:", err);
        setError("Could not load clients. Is the backend running?");
      });
  }, []);

  return (
    <div className="client-list">
      <h2>Clients</h2>
      {error && <p className="client-error">{error}</p>}
      {clients.map((client) => (
        <button
          key={client.id}
          className={`client-btn ${selectedClient?.id === client.id ? "active" : ""}`}
          onClick={() => setClient(client)}
        >
          <span className="client-initial">
            {client.company_name?.charAt(0) || "?"}
          </span>
          <span>
            <div>{client.company_name}</div>
            <div className="client-meta">{client.entity_type} &middot; {client.country}</div>
          </span>
        </button>
      ))}
    </div>
  );
}
