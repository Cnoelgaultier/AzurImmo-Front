import { Link } from 'react-router-dom';

interface TableRowProps {
    id?: number;
    adresse?: string;
    ville?: string;
    numero?: number; // C'est cette prop qui pilote l'affichage
    description?: string;
    nombre?: number;
    surface?: number;
    batiment_id?: number;
    contrat_id?: number | string;
}

const TableRow = ({
                      id, adresse, ville,
                      numero, description, nombre, surface, batiment_id, contrat_id
                  }: TableRowProps) => {

    // Si numero existe, on affiche les colonnes Appartement
    const isApp = numero !== undefined && numero !== null;

    return (
        <tr className="bg-transparent border-b border-gray-800 hover:bg-gray-800/40 transition-colors">
            {isApp ? (
                <>
                    <td className="px-6 py-4 font-bold text-white">{numero}</td>
                    <td className="px-6 py-4 text-gray-300">{description || "N/A"}</td>
                    <td className="px-6 py-4 text-center text-gray-300">{nombre}</td>
                    <td className="px-6 py-4 text-center text-gray-300">{surface} m²</td>
                    <td className="px-6 py-4 text-center font-bold text-blue-400">Bat. {batiment_id}</td>
                    <td className="px-6 py-4 text-center text-emerald-400 font-medium">
                        {contrat_id ? `Contrat ${contrat_id}` : "Libre"}
                    </td>
                </>
            ) : (
                <>
                    <td className="px-6 py-4 font-bold text-white">{id}</td>
                    <td colSpan={2} className="px-6 py-4 text-gray-300">{adresse}</td>
                    <td colSpan={3} className="px-6 py-4 capitalize text-gray-300">{ville}</td>
                </>
            )}

            <td className="px-6 py-4 text-center">
                <div className="flex justify-center gap-4">
                    {!isApp && id && (
                        <Link
                            to={`/batiments/${id}/locataires`}
                            className="text-emerald-500 hover:text-emerald-400 font-semibold transition">
                            Voir Locataires
                        </Link>
                    )}
                    <button className="text-blue-500 hover:text-blue-300 font-semibold transition">Éditer</button>
                    <button className="text-red-500 hover:text-red-300 font-semibold transition">Supprimer</button>
                </div>
            </td>
        </tr>
    );
};

export default TableRow;