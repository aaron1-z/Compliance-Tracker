import { useState, useCallback } from "react";
import ClientList from "./components/ClientList";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import "./App.css";

function App() {
  const [selectedClient, setSelectedClient] = useState(null);
  const [taskRefreshKey, setTaskRefreshKey] = useState(0);

  const refreshTasks = useCallback(() => {
    setTaskRefreshKey((k) => k + 1);
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Compliance Tracker</h1>
        <p className="subtitle">Manage clients, tasks, and deadlines</p>
      </header>

      <div className="app-body">
        <aside className="sidebar">
          <ClientList
            selectedClient={selectedClient}
            setClient={setSelectedClient}
          />
        </aside>

        <main className="main-content">
          {selectedClient ? (
            <>
              <div className="client-banner">
                <h2>{selectedClient.company_name}</h2>
                <span className="badge">{selectedClient.entity_type}</span>
                <span className="badge outline">{selectedClient.country}</span>
              </div>
              <AddTask selectedClient={selectedClient} onTaskAdded={refreshTasks} />
              <TaskList selectedClient={selectedClient} refreshKey={taskRefreshKey} />
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">&#128203;</div>
              <h2>Select a client</h2>
              <p>Choose a client from the sidebar to view and manage their compliance tasks.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;