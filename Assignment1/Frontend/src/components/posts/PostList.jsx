
import PostCard from "./PostCard";

const PostList = ({ posts, onDelete, currentUserId }) => {
    return (
        <div className="mt-4">
            {posts.length === 0 ? (
                <p className="text-gray-500 text-center">No posts found</p>
            ) : (
                posts.map((post) => (
                    <PostCard
                        key={post._id}
                        post={post}
                        onDelete={onDelete}
                        isOwner={post.user._id === currentUserId}
                    />
                ))
            )}
        </div>
    );
};

export default PostList;
