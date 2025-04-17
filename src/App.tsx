import React from "react";
import PetList from "./components/PetList";
import AddPetForm from "./components/AddPetForm";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1> PetStore App</h1>
      <AddPetForm />
      <hr />
      <PetList status="available" />
      <PetList status="pending" />
      <PetList status="sold" />
    </div>
  );
}

export default App;