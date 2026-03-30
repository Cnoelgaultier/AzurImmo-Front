import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold text-blue-400 tracking-tight hover:text-blue-300 transition">
                    AZZURIMMO
                </Link>
                <div className="flex items-center gap-6">
                    <Link to="/batiments" className="text-sm font-medium text-gray-300 hover:text-white transition">
                        Bâtiments
                    </Link>
                    <Link to="/appartements" className="text-sm font-medium text-gray-300 hover:text-white transition">
                        Appartements
                    </Link>
                    <Link to="/interventions" className="text-sm font-medium text-gray-300 hover:text-white transition">
                        Interventions
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;