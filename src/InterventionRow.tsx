interface InterventionRowProps {
    app: any;
}

const InterventionRow = ({app}: InterventionRowProps) => {
    return (
        <tr className="bg-gray-900 border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
            {/* ID */}
            <td className="px-6 py-4 font-semibold text-white">
                {app.id ?? "N/A"}
            </td>
            {/* Description */}
            <td className="px-6 py-4 text-gray-400 italic">
                {app.description || "Aucune description"}
            </td>
            {/* Date */}
            <td className="px-6 py-4 text-gray-400">
                {app.date ?? "N/A"}
            </td>
            {/* Type intervention */}
            <td className="px-6 py-4 text-gray-400">
                {app.typeIntervention?.id ?? "N/A"}
            </td>
            {/* Appartement */}
            <td className="px-6 py-4 text-gray-400">
                {app.appartement?.id ?? "N/A"}
            </td>

            {/* Actions */}
            <td className="px-6 py-4 text-center">
                <div className="flex justify-center gap-3">
                    <button className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded hover:bg-blue-600 hover:text-white transition-all text-xs">
                        Éditer
                    </button>
                    <button className="px-3 py-1 bg-red-600/20 text-red-400 rounded hover:bg-red-600 hover:text-white transition-all text-xs">
                        Supprimer
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default InterventionRow;