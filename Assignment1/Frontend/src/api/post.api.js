import api from "./axios";


export const getAllPosts = async () => {
    const res = await api.get("post/get-all-posts");
    return res.data;
};

export const getMyPosts = async () => {
    const res = await api.get("post/get-my-posts");
    return res.data;
};

export const getPostById = async (id) => {
    const res = await api.get(`post/get-post/${id}`);
    return res.data;
};


export const createPost = async (data) => {
    const res = await api.post("post/create-post", data);
    return res.data;
};

export const deletePost = async (id) => {
    const res = await api.delete(`post/delete-post/${id}`);
    return res.data;
};
