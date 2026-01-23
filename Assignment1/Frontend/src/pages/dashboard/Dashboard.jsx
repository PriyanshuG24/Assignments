import { Routes, Route } from "react-router-dom";
import Profile from "./Profile";
import MyPosts from "./MyPosts";

const Dashboard = () => {
    return (
        <div>
            <Routes>
                <Route path="profile" element={<Profile />} />
                <Route path="posts" element={<MyPosts />} />
            </Routes>
        </div>
    );
};

export default Dashboard;
