interface AppartementRowProps {
    app: any;
}

const AppartementRow = ({ app }: AppartementRowProps) => {
    console.log("Données reçues pour cet appartement :", app);

    return (
        <tr className="bg-transparent border-b border-gray-800 hover:bg-gray-800/40 transition-colors">
            {/* Numéro */}
            <td className="px-6 py-4 font-bold text-white">
                {app.numero ?? app.id ?? "N/A"}
            </td>

            {/* Description */}
            <td className="px-6 py-4 text-gray-300 italic">
                {app.description || "Aucune description"}
            </td>

            {/* Nombre de pièces */}
            <td className="px-6 py-4 text-center text-gray-300">
                {app.nombre ?? "?"}
            </td>

            {/* Surface */}
            <td className="px-6 py-4 text-center text-gray-300">
                {app.surface ? `${app.surface} m²` : "NC"}
            </td>

            {/* Bâtiment */}
            <td className="px-6 py-4 text-center font-bold text-blue-400">
                {app.batiment?.id ? `Bat. ${app.batiment.id}` : "Orphelin"}
            </td>

            {/* Contrat */}
            <td className="px-6 py-4 text-center text-emerald-400 font-medium">
                {app.contrat?.id ? `Contrat ${app.contrat.id}` : "Libre"}
            </td>

            {/* Actions */}
            <td className="px-6 py-4 text-center">
                <div className="flex justify-center gap-4">
                    <button className="text-blue-500 hover:text-blue-300 font-semibold transition">Éditer</button>
                    <button className="text-red-500 hover:text-red-300 font-semibold transition">Supprimer</button>
                </div>
            </td>
        </tr>
    );
};

export default AppartementRow;