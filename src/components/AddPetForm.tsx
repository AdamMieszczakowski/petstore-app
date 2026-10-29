import React, { useState } from 'react';
import { PetStatus, addPet } from '../api/petApi';

interface AddPetFormProps {
    onPetAdded: () => void;
}

export const AddPetForm: React.FC<AddPetFormProps> = ({ onPetAdded }) => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState<PetStatus>('available');
    const [imageUrl, setImageUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setIsSubmitting(true);
        setFeedback(null);

        try {
            await addPet({
                name: name.trim(),
                status,
                photoUrls: imageUrl.trim() ? [imageUrl.trim()] : undefined,
            });

            setFeedback({ message: `Zwierzak "${name}" został pomyślnie dodany!`, type: 'success' });
            setName('');
            setImageUrl('');
            onPetAdded();
        } catch (err) {
            setFeedback({ message: 'Wystąpił błąd podczas dodawania.', type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span>🐾</span> Dodaj nowego zwierzaka
            </h2>

            {feedback && (
                <div
                    className={`mb-4 p-3 rounded-lg text-sm font-medium ${feedback.type === 'success'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}
                >
                    {feedback.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                        Imię zwierzaka
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="np. Luna, Rocky"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                        Status
                    </label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as PetStatus)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white"
                    >
                        <option value="available">Dostępny (Available)</option>
                        <option value="pending">W trakcie adopcji (Pending)</option>
                        <option value="sold">Adoptowany (Sold)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                        URL zdjęcia (opcjonalnie)
                    </label>
                    <input
                        type="url"
                        placeholder="https://..."
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                </div>

                <div className="flex items-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold rounded-lg text-sm transition shadow-sm"
                    >
                        {isSubmitting ? 'Zapisywanie...' : 'Dodaj wpis'}
                    </button>
                </div>
            </form>
        </div>
    );
};