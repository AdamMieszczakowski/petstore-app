import { useState, useEffect } from 'react';
import { Pet, PetStatus, getPetsByStatus } from './api/petApi';
import { AddPetForm } from './components/AddPetForm';
import { PetList } from './components/PetList';

export function App() {
    const [pets, setPets] = useState<Pet[]>([]);
    const [activeStatus, setActiveStatus] = useState<PetStatus>('available');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchPets = async () => {
        setIsLoading(true);
        try {
            const data = await getPetsByStatus(activeStatus);
            setPets(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPets();
    }, [activeStatus]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            {/* Header */}
            <header className="bg-slate-900 text-white py-6 border-b border-slate-800 shadow-md">
                <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                            <span>🐾</span> PetCare Hub
                        </h1>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Modern Pet Adoption & Inventory Management Platform
                        </p>
                    </div>
                    <span className="bg-slate-800 border border-slate-700 text-xs px-3 py-1.5 rounded-full font-mono text-slate-300">
                        Swagger Petstore v2 API
                    </span>
                </div>
            </header>

            {/* Treść */}
            <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
                <AddPetForm onPetAdded={fetchPets} />
                <PetList
                    pets={pets}
                    isLoading={isLoading}
                    activeStatus={activeStatus}
                    onStatusChange={setActiveStatus}
                />
            </main>
        </div>
    );
}

export default App;