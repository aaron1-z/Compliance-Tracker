import { useEffect, useState } from "react";
import axios from "axios";

export default function ClientList({ setClient }) {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/clients")
      .then(res => setClients(res.data));
  }, []);

  return (
    <div>
      <h2>Clients</h2>
      {clients.map(client => (
        <button
          key={client.id}
          onClick={() => setClient(client)}
        >
          {client.company_name}
        </button>
      ))}
    </div>
  );
}