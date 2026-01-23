import api from "./axios";

export const getUserProfile = async () => {
    const res = await api.get("/user/profile");
    return res.data;
};

export const updateUserProfile = async (data) => {
    const res = await api.put("/user/update-profile", data);
    return res.data;
};