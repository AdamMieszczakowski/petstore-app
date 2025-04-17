export type PetStatus = "available" | "pending" | "sold";

export interface Pet {
  id: number;
  name: string;
  status: PetStatus;
  photoUrls: string[];
}

const BASE_URL = "https://petstore.swagger.io/v2/pet";

export const fetchPetsByStatus = async (status: PetStatus): Promise<Pet[]> => {
  const res = await fetch(`${BASE_URL}/findByStatus?status=${status}`);
  return res.json();
};

export const addPet = async (pet: Pet): Promise<Pet> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pet),
  });
  return res.json();
};