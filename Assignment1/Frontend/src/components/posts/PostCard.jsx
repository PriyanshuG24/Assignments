
const PostCard = ({ post, onDelete, isOwner }) => {
    return (
        <div className="bg-white shadow-md rounded p-4 mb-4">
            <h3 className="text-lg font-bold mb-2">{post.title}</h3>
            <p className="text-gray-700 mb-2">{post.content}</p>
            <p className="text-gray-400 text-sm">
                By: {post.user?.username || "Unknown"} | {new Date(post.createdAt).toLocaleString()}
            </p>

            {isOwner && onDelete && (
                <button
                    onClick={() => onDelete?.(post._id)}
                    className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                    Delete
                </button>
            )}
        </div>
    );
};

export default PostCard;
