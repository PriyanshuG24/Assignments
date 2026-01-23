import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AllPosts from "../pages/public/AllPosts";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Profile from "../pages/dashboard/Profile";
import MyPosts from "../pages/dashboard/MyPosts";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/posts" />} />
            <Route path="/posts" element={<AllPosts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Navigate to="profile" />} />

                <Route path="profile" element={<Profile />} />
                <Route path="my-posts" element={<MyPosts />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
