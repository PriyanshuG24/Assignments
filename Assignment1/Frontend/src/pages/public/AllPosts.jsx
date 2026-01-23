import { useEffect, useState } from "react";
import PostList from "../../components/posts/PostList";
import { getAllPosts, deletePost } from "../../api/post.api";
import { useAuth } from "../../hooks/useAuth";

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { userId } = useAuth();

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const res = await getAllPosts();
            setPosts(res.result.posts);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch posts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);


    const filteredPosts = posts.filter(
        (post) =>
            post.title?.toLowerCase().includes(search.toLowerCase()) ||
            post.content?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col h-screen">
            <div className="bg-white mt-16">
                <div className="max-w-4xl mx-auto p-6">
                    <h1 className="text-3xl font-bold mb-4">All Posts</h1>
                    <input
                        type="text"
                        placeholder="Search posts by title or content..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                <div className="max-w-4xl mx-auto p-6">
                    {loading ? (
                        <p>Loading posts...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <PostList
                            posts={filteredPosts}
                            currentUserId={userId}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllPosts;