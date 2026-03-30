import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBatimentsDTO } from './api/BatimentService.ts';
import TableRow from './TableRow';
import axios from './api/axiosInstance.ts';

const BatimentTable = () => {
    const queryClient = useQueryClient();
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        adresse: '',
        ville: '',
    });

    const { data: batiments, isLoading, error } = useQuery({
        queryKey: ['batiments-dto'],
        queryFn: getBatimentsDTO,
    });

    const mutation = useMutation({
        mutationFn: (newBat: any) => axios.post('/batiments/', newBat),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['batiments-dto'] });
            setShowModal(false);
            setForm({ adresse: '', ville: '' });
        },
    });

    const handleSubmit = () => {
        mutation.mutate({
            adresse: form.adresse,
            ville: form.ville,
        });
    };

    if (isLoading) return <div className="p-6 text-blue-400">Chargement...</div>;
    if (error) return <div className="p-6 text-red-400">Erreur de chargement.</div>;

    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-extrabold text-white tracking-tight">
                    Gestion des <span className="text-blue-500">Bâtiments</span>
                </h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-900/20">
                    + Ajouter un Bâtiment
                </button>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-gray-800/80 text-gray-400 uppercase text-xs font-bold tracking-widest">
                        <th className="px-6 py-4 border-b border-gray-800">ID</th>
                        <th className="px-6 py-4 border-b border-gray-800">Adresse</th>
                        <th className="px-6 py-4 border-b border-gray-800">Ville</th>
                        <th className="px-6 py-4 border-b border-gray-800 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                    {batiments && batiments.length > 0 ? (
                        batiments.map((bat) => (
                            <TableRow
                                key={bat.id}
                                id={bat.id}
                                adresse={bat.adresse}
                                ville={bat.ville}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="px-6 py-20 text-center text-gray-500">
                                Aucun bâtiment enregistré.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <div className="text-sm text-gray-500 italic px-6 py-3 border-t border-gray-800">
                    Total : {batiments?.length || 0} bâtiment(s) trouvé(s).
                </div>
            </div>

            {/* Modale */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-md space-y-4">
                        <h3 className="text-xl font-bold text-white">Nouveau bâtiment</h3>

                        <input
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                            placeholder="Adresse"
                            value={form.adresse}
                            onChange={e => setForm({ ...form, adresse: e.target.value })}
                        />
                        <input
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                            placeholder="Ville"
                            value={form.ville}
                            onChange={e => setForm({ ...form, ville: e.target.value })}
                        />

                        {mutation.isError && (
                            <p className="text-red-400 text-sm">Erreur lors de la création.</p>
                        )}

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition">
                                Annuler
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={mutation.isPending}
                                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition disabled:opacity-50">
                                {mutation.isPending ? 'Enregistrement...' : 'Créer'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BatimentTable;