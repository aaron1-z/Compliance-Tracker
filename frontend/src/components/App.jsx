import { useState } from "react";
import ClientList from "./components/ClientList";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";

function App() {
  const [selectedClient, setClient] =
    useState(null);

  return (
    <div>
      <h1>Compliance Tracker</h1>

      <ClientList setClient={setClient} />

      {selectedClient && (
        <>
          <AddTask
            selectedClient={
              selectedClient
            }
          />

          <TaskList
            selectedClient={
              selectedClient
            }
          />
        </>
      )}
    </div>
  );
}

export default App;