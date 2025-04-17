import React, { useState } from "react";
import { addPet, PetStatus } from "../api/petApi";

const AddPetForm = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<PetStatus>("available");
  const [newId, setNewId] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pet = {
      id: Math.floor(Math.random() * 1000000),
      name,
      status,
      photoUrls: [],
    };
    const added = await addPet(pet);
    setNewId(added.id);
    setName("");
  };

  return (
    <div>
      <h2>Dodaj zwierzaka</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nazwa"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select value={status} onChange={(e) => setStatus(e.target.value as PetStatus)}>
          <option value="available">Dostępny</option>
          <option value="pending">Oczekujący</option>
          <option value="sold">Sprzedany</option>
        </select>
        <button type="submit">Dodaj</button>
      </form>
      {newId && <p>Dodano! ID: {newId}</p>}
    </div>
  );
};

export default AddPetForm;