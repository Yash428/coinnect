import React, { useState } from "react";
import { FaImage } from "react-icons/fa";

function PostComposer({ user, onPostSubmit }) {
  const [newPostText, setNewPostText] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);

  const handlePostSubmit = () => {
    if (newPostText.trim() || newPostImage) {
      const newPost = {
        id: Date.now(),
        text: newPostText,
        image: newPostImage,
        user: { ...user },
        likes: 0,
        liked: false,
        dislikes: 0,
        disliked: false,
        comments: [],
        showComments: false,
        showCommentInput: false,
        newCommentText: "",
        newCommentImage: null,
      };
      
      onPostSubmit(newPost);
      setNewPostText("");
      setNewPostImage(null);
    }
  };

  const handlePostImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewPostImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="post-composer">
      <div className="composer-header">
        <img
          src={user.profile_picture}
          alt={user.name}
          className="user-avatar-small"
        />
        <span className="username-small">{user.name}</span>
      </div>

      <textarea
        placeholder="Type something..."
        value={newPostText}
        onChange={(e) => setNewPostText(e.target.value)}
        className="post-input"
      />

      {newPostImage && (
        <div className="image-preview">
          <img src={newPostImage} alt="Post preview" />
          <button
            onClick={() => setNewPostImage(null)}
            className="remove-image"
          >
            ×
          </button>
        </div>
      )}

      <div className="composer-actions">
        <label className="upload-image-button">
          <FaImage />
          <input
            type="file"
            accept="image/*"
            onChange={handlePostImageChange}
            style={{ display: "none" }}
          />
        </label>
        <button
          className="post-button"
          onClick={handlePostSubmit}
          disabled={!newPostText.trim() && !newPostImage}
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default PostComposer;