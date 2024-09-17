import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [petId, setPetId] = useState('');
  const [pet, setPet] = useState(null);
  const [error, setError] = useState(null);

  const fetchPet = async () => {
    try {
      setError(null);
      setPet(null);
      const response = await axios.get(`http://localhost:8080/pets/${petId}`);
      setPet(response.data);
    } catch (err) {
      setError('Failed to fetch pet. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <h1>Petstore Client</h1>
      <div>
        <input
          type="number"
          value={petId}
          onChange={(e) => setPetId(e.target.value)}
          placeholder="Enter Pet ID"
        />
        <button onClick={fetchPet}>Fetch Pet</button>
      </div>
      {error && <p className="error">{error}</p>}
      {pet && (
        <div className="pet-info">
          <h2>Pet Information</h2>
          <p><strong>ID:</strong> {pet.id}</p>
          <p><strong>Name:</strong> {pet.name}</p>
          <p><strong>Type:</strong> {pet.type}</p>
          <p><strong>Status:</strong> {pet.status}</p>
        </div>
      )}
    </div>
  );
}

export default App;