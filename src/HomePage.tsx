import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-12">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-black tracking-tight text-white mb-4">
                    AZZUR<span className="text-blue-500">IMMO</span>
                </h1>
                <p className="text-gray-400 text-base max-w-md mx-auto leading-relaxed">
                    La gestion immobilière simplifiée. Sélectionnez une catégorie pour commencer.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
                <Link to="/batiments" className="group bg-gray-900 border border-gray-800 rounded-2xl p-8 flex flex-col items-center gap-4 hover:border-blue-500 hover:-translate-y-1 transition-all duration-200">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                    </div>
                    <div className="text-center">
                        <p className="text-white font-semibold mb-1">Bâtiments</p>
                        <p className="text-gray-500 text-sm">Structures, adresses et infos générales.</p>
                    </div>
                    <span className="text-xs text-gray-600 border border-gray-800 rounded-full px-3 py-1">Gérer</span>
                </Link>

                <Link to="/appartements" className="group bg-gray-900 border border-gray-800 rounded-2xl p-8 flex flex-col items-center gap-4 hover:border-blue-500 hover:-translate-y-1 transition-all duration-200">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                    </div>
                    <div className="text-center">
                        <p className="text-white font-semibold mb-1">Appartements</p>
                        <p className="text-gray-500 text-sm">Lots, surfaces et statuts de location.</p>
                    </div>
                    <span className="text-xs text-gray-600 border border-gray-800 rounded-full px-3 py-1">Gérer</span>
                </Link>

                <Link to="/interventions" className="group bg-gray-900 border border-gray-800 rounded-2xl p-8 flex flex-col items-center gap-4 hover:border-blue-500 hover:-translate-y-1 transition-all duration-200">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    </div>
                    <div className="text-center">
                        <p className="text-white font-semibold mb-1">Interventions</p>
                        <p className="text-gray-500 text-sm">Suivi et détail des interventions.</p>
                    </div>
                    <span className="text-xs text-gray-600 border border-gray-800 rounded-full px-3 py-1">Gérer</span>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;