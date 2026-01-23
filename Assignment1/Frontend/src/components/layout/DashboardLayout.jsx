import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { logoutUser } from "../../api/auth.api"
const DashboardLayout = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutUser();
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex bg-gray-100">

            <aside className="fixed top-0 left-0 h-full w-36 bg-white shadow-lg rounded-r-2xl border border-2 border-gray-400">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-blue-600">
                        Dashboard
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {user?.username}
                    </p>
                </div>

                <nav className="p-4 flex flex-col gap-2">
                    <NavLink
                        to="/dashboard/profile"
                        className={({ isActive }) =>
                            `p-2 rounded font-medium ${isActive
                                ? "bg-blue-600 text-white"
                                : "text-gray-700 hover:bg-gray-100"
                            }`
                        }
                    >
                        Profile
                    </NavLink>

                    <NavLink
                        to="/dashboard/my-posts"
                        className={({ isActive }) =>
                            `p-2 rounded font-medium ${isActive
                                ? "bg-blue-600 text-white"
                                : "text-gray-700 hover:bg-gray-100"
                            }`
                        }
                    >
                        My Posts
                    </NavLink>

                    <button
                        onClick={handleLogout}
                        className="mt-4 p-2 text-left rounded font-medium text-red-600 hover:bg-red-50"
                    >
                        Logout
                    </button>
                </nav>
            </aside>
            <main className="flex-1 w-full p-6 ml-36">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
