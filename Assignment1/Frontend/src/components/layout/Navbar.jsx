import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
const Navbar = () => {
    const { user } = useAuth();
    if (user) {
        return null;
    }
    return (
        <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between fixed top-0 w-full z-11">

            <div className="text-xl font-bold text-blue-600">
                <Link to="/">MyApp</Link>
            </div>
            <div className="flex items-center space-x-6">
                <Link
                    to="/posts"
                    className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded"
                >
                    All Posts
                </Link>

                <Link
                    to="/login"
                    className="text-gray-700  bg-blue-600 text-white font-medium px-4 py-2 rounded"
                >
                    Login
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
