import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAppartementsDTO } from './api/AppartementService.ts';
import AppartementRow from './AppartementRow';
import axios from './api/axiosInstance.ts';

const AppartementTable = () => {
    const queryClient = useQueryClient();
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        description: '',
        nombre: '',
        surface: '',
        batiment_id: '',
        contrat_id: '',
    });

    const { data: appartements, isLoading, error } = useQuery({
        queryKey: ['appartements-dto'],
        queryFn: getAppartementsDTO,
    });

    const mutation = useMutation({
        mutationFn: (newApp: any) => axios.post('/appartements/', newApp),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appartements-dto'] });
            setShowModal(false);
            setForm({ description: '', nombre: '', surface: '', batiment_id: '', contrat_id: '' });
        },
    });

    const handleSubmit = () => {
        mutation.mutate({
            description: form.description,
            nombre: Number(form.nombre),
            surface: Number(form.surface),
            batiment: { id: Number(form.batiment_id) },
            contrat: form.contrat_id ? { id: Number(form.contrat_id) } : null,
        });
    };

    if (isLoading) return <div className="p-6 text-blue-400">Chargement...</div>;
    if (error) return <div className="p-6 text-red-400">Erreur de chargement.</div>;

    return (
        <div className="w-full space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-extrabold text-white tracking-tight">
                    Gestion des <span className="text-blue-500">Appartements</span>
                </h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    + Ajouter un appartement
                </button>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-gray-800/80 text-gray-400 uppercase text-xs font-bold tracking-widest">
                        <th className="px-6 py-4 border-b border-gray-800">Numéro</th>
                        <th className="px-6 py-4 border-b border-gray-800">Description</th>
                        <th className="px-6 py-4 border-b border-gray-800">Pièces</th>
                        <th className="px-6 py-4 border-b border-gray-800">Surface</th>
                        <th className="px-6 py-4 border-b border-gray-800">Bâtiment</th>
                        <th className="px-6 py-4 border-b border-gray-800">Contrat</th>
                        <th className="px-6 py-4 border-b border-gray-800 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                    {appartements && appartements.length > 0 ? (
                        appartements.map((app) => (
                            <AppartementRow
                                key={app.numero ?? app.id}
                                app={app}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="px-6 py-20 text-center text-gray-500">
                                Aucun appartement enregistré.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Modale */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-md space-y-4">
                        <h3 className="text-xl font-bold text-white">Nouvel appartement</h3>

                        <input
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                            placeholder="Description"
                            value={form.description}
                            onChange={e => setForm({ ...form, description: e.target.value })}
                        />
                        <input
                            type="number"
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                            placeholder="Nombre de pièces"
                            value={form.nombre}
                            onChange={e => setForm({ ...form, nombre: e.target.value })}
                        />
                        <input
                            type="number"
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                            placeholder="Surface (m²)"
                            value={form.surface}
                            onChange={e => setForm({ ...form, surface: e.target.value })}
                        />
                        <input
                            type="number"
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                            placeholder="ID du bâtiment"
                            value={form.batiment_id}
                            onChange={e => setForm({ ...form, batiment_id: e.target.value })}
                        />
                        <input
                            type="number"
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                            placeholder="ID du contrat (optionnel)"
                            value={form.contrat_id}
                            onChange={e => setForm({ ...form, contrat_id: e.target.value })}
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

export default AppartementTable;