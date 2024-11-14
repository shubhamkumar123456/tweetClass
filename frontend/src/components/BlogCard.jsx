import React, { useState } from "react";

const BlogCard = ({ title, description, user, userPic }) => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentInput.trim()) {
      setComments([...comments, commentInput]);
      setCommentInput("");
    }
  };

  return (
    <div className="col-span-3 bg-white shadow-md rounded-lg p-6 mb-4">
      <div className="flex items-center mb-4">
        <img
          src={userPic}
          alt="User"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm text-gray-500">By {user}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="flex items-center mb-4">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-4"
          onClick={handleLike}
        >
          Like {likes > 0 && `(${likes})`}
        </button>
      </div>
      <form onSubmit={handleCommentSubmit} className="mb-4">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2 mb-2"
          placeholder="Add a comment"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          Comment
        </button>
      </form>
      <div>
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="border-t border-gray-200 pt-2">
              <p className="text-gray-700">{comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
