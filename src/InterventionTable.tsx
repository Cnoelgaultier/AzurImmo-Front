import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getInterventionDTO } from './api/InterventionService.ts';
import InterventionRow from './InterventionRow.tsx';
import axios from './api/axiosInstance.ts';

const InterventionTable = () => {
    const queryClient = useQueryClient();
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        description: '',
        date: '',
        typeIntervention_id: '',
        appartement_id: '',
    });

    const { data: interventions, isLoading, error } = useQuery({
        queryKey: ['intervention-dto'],
        queryFn: getInterventionDTO,
    });

    const mutation = useMutation({
        mutationFn: (newInter: any) => axios.post('/interventions/', newInter),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['intervention-dto'] });
            setShowModal(false);
            setForm({ description: '', date: '', typeIntervention_id: '', appartement_id: '' });
        },
    });

    const handleSubmit = () => {
        mutation.mutate({
            description: form.description,
            date: form.date,                              // "YYYY-MM-DD" compatible java.sql.Date
            typeIntervention: form.typeIntervention_id
                ? { id: Number(form.typeIntervention_id) }
                : null,
            appartement: { id: Number(form.appartement_id) },
        });
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-20 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p className="text-gray-400 animate-pulse">Chargement d'Azzurimmo...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-red-900/20 border border-red-500/50 rounded-xl text-center">
                <p className="text-red-400 font-medium">Impossible de charger les interventions.</p>
                <p className="text-red-300/60 text-sm mt-1">Vérifiez que votre API Spring Boot est bien lancée.</p>
            </div>
        );
    }

    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-extrabold text-white tracking-tight">
                    Gestion des <span className="text-blue-500">Interventions</span>
                </h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-900/20">
                    + Ajouter une intervention
                </button>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-gray-800/80 text-gray-400 uppercase text-xs font-bold tracking-widest">
                        <th className="px-6 py-4 border-b border-gray-800">ID</th>
                        <th className="px-6 py-4 border-b border-gray-800">Description</th>
                        <th className="px-6 py-4 border-b border-gray-800">Date</th>
                        <th className="px-6 py-4 border-b border-gray-800">Type</th>
                        <th className="px-6 py-4 border-b border-gray-800">Appartement</th>
                        <th className="px-6 py-4 border-b border-gray-800 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                    {interventions && interventions.length > 0 ? (
                        interventions.map((uneInter) => (
                            <InterventionRow
                                key={uneInter.id}
                                app={uneInter}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="px-6 py-20 text-center">
                                <div className="flex flex-col items-center space-y-2">
                                    <span className="text-4xl">🔧</span>
                                    <p className="text-gray-500 font-medium">Aucune intervention enregistrée pour le moment.</p>
                                </div>
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
                        <h3 className="text-xl font-bold text-white">Nouvelle intervention</h3>

                        <input
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                            placeholder="Description"
                            value={form.description}
                            onChange={e => setForm({ ...form, description: e.target.value })}
                        />

                        <div className="space-y-1">
                            <label className="text-xs text-gray-400 uppercase tracking-wide">Date</label>
                            <input
                                type="date"
                                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                                value={form.date}
                                onChange={e => setForm({ ...form, date: e.target.value })}
                            />
                        </div>

                        {/* TypeIntervention est une entité liée → on envoie son id */}
                        <input
                            type="number"
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                            placeholder="ID du type d'intervention"
                            value={form.typeIntervention_id}
                            onChange={e => setForm({ ...form, typeIntervention_id: e.target.value })}
                        />

                        <input
                            type="number"
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                            placeholder="ID de l'appartement"
                            value={form.appartement_id}
                            onChange={e => setForm({ ...form, appartement_id: e.target.value })}
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

export default InterventionTable;