import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../../api/user.api";
import { FiEdit } from 'react-icons/fi'
import { toast } from 'sonner'

const Profile = () => {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const res = await getUserProfile();
            setUser(res.user);
            setUpdatedUser(res.user);
        };
        fetchProfile();
    }, []);

    const updateProfileHandler = async () => {
        let check = false;
        if (user.username !== updatedUser.username) check = true;
        if (user.email !== updatedUser.email) check = true;

        if (!check) {
            toast.info("Change any field to update profile");
            return;
        }
        try {
            const res = await updateUserProfile({
                username: updatedUser.username,
                email: updatedUser.email
            });

            if (res.success) {
                setUser(res.user);
                toast.success("Profile updated successfully");
                setEditMode(false); // Exit edit mode on success
            } else {
                toast.error(res.message || "Something went wrong");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to update profile";
            toast.error(errorMessage);
            console.error("Update error:", error);
        }
    };
    const handleCancelUpdate = () => {
        setEditMode((prev) => !prev);
        setUpdatedUser({ ...user });
    };
    if (!user) {
        return <p className="text-gray-500">Loading profile...</p>;
    }

    return (
        <div className="max-w-xl bg-white shadow rounded p-6">
            <div className="flex justify-between items-center mb-4 gap-4">
                <h1 className="text-2xl font-bold">Profile</h1>
                <h1 className="cursor-pointer flex gap-2 items-center" onClick={handleCancelUpdate}>
                    {editMode ? (<span className="text-red-600">Cancel Edit</span>) : (<span className="text-blue-600">Edit Profile</span>)}
                    {editMode ? <FiEdit className="text-red-600" /> : <FiEdit className="text-blue-600" />}
                </h1>
            </div>

            <div className="space-y-2">
                {
                    editMode ? (
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2 items-center">
                                <label>Username:</label>
                                <input type="text" value={updatedUser.username} onChange={(e) => setUpdatedUser({ ...updatedUser, username: e.target.value })} className="border border-gray-300 rounded px-2 py-1" />
                            </div>
                            <div className="flex gap-2 items-center">
                                <label>Email:</label>
                                <input type="text" value={updatedUser.email} onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })} className="border border-gray-300 rounded px-2 py-1" />
                            </div>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => { setEditMode(false); updateProfileHandler() }}>Save</button>
                        </div>
                    ) : (
                        <div>
                            <p>
                                <span className="font-semibold">Username:</span> {user.username}
                            </p>
                            <p>
                                <span className="font-semibold">Email:</span> {user.email}
                            </p>
                        </div>
                    )
                }

            </div>
            <button
                onClick={() => navigate("/dashboard/my-posts")}
                className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Go to My Posts
            </button>
        </div>
    );
};

export default Profile;
