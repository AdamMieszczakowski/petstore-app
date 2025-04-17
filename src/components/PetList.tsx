import React, { useEffect, useState } from "react";
import { fetchPetsByStatus, Pet, PetStatus } from "../api/petApi";

type Props = {
  status: PetStatus;
};

const PetList: React.FC<Props> = ({ status }) => {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    fetchPetsByStatus(status).then(setPets);
  }, [status]);

  return (
    <div>
      <h2>Zwierzęta: {status}</h2>
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            {pet.name} (ID: {pet.id})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PetList;