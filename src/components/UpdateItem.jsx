import { useState, useEffect } from "react";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

const UpdateItem = ({ doorId }) => {
  const [door, setDoor] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // Fetch existing door data when the component mounts
  useEffect(() => {
    const fetchDoor = async () => {
      try {
        const response = await fetch(`${API_URI}/${doorId}`);
        if (!response.ok) throw new Error("Failed to fetch door data");
        const data = await response.json();
        setDoor(data);
        setUpdatedName(data.name || ""); // Set initial input value
      } catch (error) {
        console.error(error);
      }
    };

    fetchDoor();
  }, [doorId]);

  // Handle input change
  const handleInputChange = (e) => {
    setUpdatedName(e.target.value);
  };

  // Handle form submission (Update item)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URI}/${doorId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: updatedName }),
      });

      if (!response.ok) throw new Error("Failed to update door");

      const updatedDoor = await response.json();
      setDoor(updatedDoor); // Update state with new data
      alert("Door updated successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  if (!door) return <p>Loading door data...</p>;

  return (
    <div>
      <h2>Update Door</h2>
      <form onSubmit={handleSubmit}>
        <label>Door Name:</label>
        <input type="text" value={updatedName} onChange={handleInputChange} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateItem;
