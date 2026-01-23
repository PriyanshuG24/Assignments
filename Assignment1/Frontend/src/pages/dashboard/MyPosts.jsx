import { useEffect, useState } from "react";
import { createPost, getMyPosts, deletePost } from "../../api/post.api";
import PostForm from "../../components/posts/PostForm";
import PostList from "../../components/posts/PostList";
import { useAuth } from "../../hooks/useAuth";
import { toast } from 'sonner'

const MyPosts = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const data = await getMyPosts();
            setPosts(data.result.posts);
            setLoading(false);
        };
        fetchPosts();
    }, [user._id]);

    const handleCreatePost = async (postData) => {
        const newPost = await createPost(postData);
        setPosts((prev) => [...prev, newPost.post]);
        toast.success("Post created successfully");
    };

    const handleDeletePost = async (id) => {
        await deletePost(id);
        setPosts((prev) => prev.filter((post) => post._id !== id));
        toast.success("Post deleted successfully");
    };

    return (
        <div className="w-full p-6 ">
            <h1 className="text-2xl font-bold mb-4">My Posts</h1>

            <PostForm onCreate={handleCreatePost} />

            {loading ? (
                <p className="text-gray-500">Loading posts...</p>
            ) : (
                posts.length > 0 ? (
                    <PostList posts={posts} onDelete={handleDeletePost} currentUserId={user.userId} />
                ) : (
                    <p className="text-gray-500">No posts found.</p>
                )
            )}
        </div>
    );
};

export default MyPosts;
