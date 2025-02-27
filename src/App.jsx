import { useState, useEffect } from "react";
import UpdateItem from "./components/UpdateItem";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  const [doors, setDoors] = useState([]);
  const [selectedDoorId, setSelectedDoorId] = useState(null);

  // Fetch all doors when the app loads
  useEffect(() => {
    const fetchDoors = async () => {
      try {
        const response = await fetch(API_URI);
        if (!response.ok) throw new Error("Failed to fetch doors");
        const data = await response.json();
        setDoors(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDoors();
  }, []);

  return (
    <div>
      <h1>Doors Management</h1>
      <h3>Select a door to update:</h3>
      <ul>
        {doors.map((door) => (
          <li key={door.id}>
            <button onClick={() => setSelectedDoorId(door.id)}>
              Edit {door.name}
            </button>
          </li>
        ))}
      </ul>

      {selectedDoorId && <UpdateItem doorId={selectedDoorId} />}
    </div>
  );
}

export default App;
