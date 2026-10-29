import React, { useState } from 'react';
import { Pet, PetStatus } from '../api/petApi';

interface PetListProps {
    pets: Pet[];
    isLoading: boolean;
    activeStatus: PetStatus;
    onStatusChange: (status: PetStatus) => void;
}

const statusBadgeStyles: Record<PetStatus, string> = {
    available: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    pending: 'bg-amber-100 text-amber-800 border-amber-200',
    sold: 'bg-slate-100 text-slate-700 border-slate-200',
};

const statusLabels: Record<PetStatus, string> = {
    available: 'Dostępny',
    pending: 'W trakcie',
    sold: 'Adoptowany',
};

export const PetList: React.FC<PetListProps> = ({ pets, isLoading, activeStatus, onStatusChange }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPets = pets.filter((pet) =>
        pet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Zakładki filtrów i wyszukiwarka */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex gap-2">
                    {(['available', 'pending', 'sold'] as PetStatus[]).map((st) => (
                        <button
                            key={st}
                            onClick={() => onStatusChange(st)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${activeStatus === st
                                    ? 'bg-slate-900 text-white shadow-sm'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            {statusLabels[st]}
                        </button>
                    ))}
                </div>

                <div className="w-full sm:w-72">
                    <input
                        type="text"
                        placeholder="Szukaj po imieniu..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                </div>
            </div>

            {/* Stan ładowania */}
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="animate-pulse bg-white p-4 rounded-2xl border border-slate-200 h-64">
                            <div className="bg-slate-200 h-40 rounded-xl mb-4"></div>
                            <div className="bg-slate-200 h-4 w-3/4 rounded mb-2"></div>
                            <div className="bg-slate-200 h-4 w-1/4 rounded"></div>
                        </div>
                    ))}
                </div>
            ) : filteredPets.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
                    <p className="text-4xl mb-2">🔍</p>
                    <p className="text-slate-500 font-medium">Nie znaleziono żadnych zwierzaków spełniających kryteria.</p>
                </div>
            ) : (
                /* Siatka kafelków */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPets.map((pet, idx) => {
                        const image =
                            pet.photoUrls && pet.photoUrls.length > 0 && pet.photoUrls[0].startsWith('http')
                                ? pet.photoUrls[0]
                                : 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&auto=format&fit=crop&q=80';

                        return (
                            <div
                                key={pet.id || idx}
                                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
                            >
                                <div className="relative h-48 bg-slate-100 overflow-hidden">
                                    <img
                                        src={image}
                                        alt={pet.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.currentTarget as HTMLImageElement).src =
                                                'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&auto=format&fit=crop&q=80';
                                        }}
                                    />
                                    <span
                                        className={`absolute top-3 right-3 px-2.5 py-1 text-xs font-bold rounded-full border shadow-sm ${statusBadgeStyles[pet.status] || statusBadgeStyles.available
                                            }`}
                                    >
                                        {statusLabels[pet.status] || pet.status}
                                    </span>
                                </div>

                                <div className="p-5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-900 capitalize">{pet.name}</h3>
                                        <p className="text-xs text-slate-400 mt-1">ID: #{pet.id || 'N/A'}</p>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
                                        <span>Kategoria: {pet.category?.name || 'Inne'}</span>
                                        <span className="font-semibold text-indigo-600">Gotowy do adopcji</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};