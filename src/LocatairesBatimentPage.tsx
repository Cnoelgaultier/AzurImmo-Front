import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getLocatairesByBatimentId } from './api/BatimentService'; // Ajuste le chemin si besoin

const LocatairesBatimentPage = () => {
    const { id } = useParams<{ id: string }>();

    const { data: locataires, isLoading, error } = useQuery({
        queryKey: ['locataires-batiment', id],
        queryFn: () => getLocatairesByBatimentId(Number(id)),
        enabled: !!id,
    });

    if (isLoading) return <div className="p-6 text-blue-400">Chargement des locataires...</div>;
    if (error) return <div className="p-6 text-red-400">Erreur lors du chargement.</div>;

    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-extrabold text-white tracking-tight">
                    Locataires du <span className="text-blue-500">Bâtiment {id}</span>
                </h2>
                <Link
                    to="/batiments"
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg">
                    Retour aux bâtiments
                </Link>
            </div>

            {/* Table (Même design que BatimentTable) */}
            <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-gray-800/80 text-gray-400 uppercase text-xs font-bold tracking-widest">
                        <th className="px-6 py-4 border-b border-gray-800">ID</th>
                        <th className="px-6 py-4 border-b border-gray-800">Nom & Prénom</th>
                        <th className="px-6 py-4 border-b border-gray-800">Email</th>
                        <th className="px-6 py-4 border-b border-gray-800">Téléphone</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                    {locataires && locataires.length > 0 ? (
                        locataires.map((locataire) => (
                            <tr key={locataire.id} className="hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4 text-gray-300">{locataire.id}</td>
                                <td className="px-6 py-4 text-white font-medium">{locataire.prenom} {locataire.nom}</td>
                                <td className="px-6 py-4 text-gray-400">{locataire.email}</td>
                                <td className="px-6 py-4 text-gray-400">0{locataire.tel}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="px-6 py-20 text-center text-gray-500">
                                Aucun locataire trouvé pour ce bâtiment.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <div className="text-sm text-gray-500 italic px-6 py-3 border-t border-gray-800">
                    Total : {locataires?.length || 0} locataire(s) trouvé(s).
                </div>
            </div>
        </div>
    );
};

export default LocatairesBatimentPage;