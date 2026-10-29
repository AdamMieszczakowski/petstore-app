export type PetStatus = 'available' | 'pending' | 'sold';

export interface Pet {
    id?: number;
    name: string;
    status: PetStatus;
    photoUrls?: string[];
    category?: {
        id: number;
        name: string;
    };
}

const BASE_URL = 'https://petstore.swagger.io/v2';

export const getPetsByStatus = async (status: PetStatus): Promise<Pet[]> => {
    const response = await fetch(`${BASE_URL}/pet/findByStatus?status=${status}`);
    if (!response.ok) {
        throw new Error(`B³¹d pobierania danych: ${response.statusText}`);
    }
    const data: Pet[] = await response.json();

    // Filtrowanie wpisów: usuwamy puste lub uszkodzone dane z publicznego Petstore
    return data
        .filter(pet => pet.name && pet.name.trim() !== '' && pet.name.toLowerCase() !== 'string')
        .slice(0, 30); // ograniczamy do 30 najnowszych/najciekawszych
};

export const addPet = async (pet: Omit<Pet, 'id'>): Promise<Pet> => {
    const response = await fetch(`${BASE_URL}/pet`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...pet,
            id: Math.floor(Math.random() * 1000000), // unikalne ID
            photoUrls: pet.photoUrls?.length ? pet.photoUrls : [
                'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=80'
            ]
        }),
    });

    if (!response.ok) {
        throw new Error('Nie uda³o siê dodaæ zwierzaka.');
    }

    return response.json();
};