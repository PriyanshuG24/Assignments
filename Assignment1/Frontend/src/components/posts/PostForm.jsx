// src/components/posts/PostForm.js
import { useState } from "react";
import { FiPlus } from 'react-icons/fi'

const PostForm = ({ onCreate }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [createPost, setCreatePost] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !content) return;

        onCreate({ title, content });
        setTitle("");
        setContent("");
        setCreatePost(false)
    };

    return (
        (!createPost ?
            (
                <div className="flex gap-2 items-center justify-center bg-blue-300 p-4 rounded shadow-md mb-6 cursor-pointer "
                    onClick={() => setCreatePost(true)}>
                    <h1>Create New Post</h1>
                    <FiPlus />
                </div>
            )
            :
            (<div>
                <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-6">
                    <h3 className="text-lg font-bold mb-4">Create a new post</h3>

                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border p-2 rounded w-full mb-3"
                        required
                    />

                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="border p-2 rounded w-full mb-3"
                        rows={4}
                        required
                    />

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                        Post
                    </button>
                </form>
            </div>)
        )
    );
};

export default PostForm;
