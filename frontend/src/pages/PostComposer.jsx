import React, { useState } from "react";
import { FaImage } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

function PostComposer({ user, onPostSubmit, community_id, addNewPost }) {
  const [newPostText, setNewPostText] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);

  const handlePostSubmit = (e) => {
    e.preventDefault();
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

      let data = new FormData();
      data.append("content", newPostText);
      data.append("image", newPostImage);
      if (community_id === undefined) {
        axios
          .post("http://localhost:8002/api/v1/commonPosts/addPost", data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => res.data)
          .then((result) => {
            setNewPostText("");
            setNewPostImage(null);
            toast.success("Posted successfully!", {
              position: "top-right",
              autoClose: 3000,
            });
          })
          .catch((err) => {
            console.log(err);
            toast.warn("Error Occured!");
          });
      } else {
        data.append("community_id", community_id);
        axios
          .post(
            "http://localhost:8002/api/v1/commonPosts/addCommunityPost",
            data,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => res.data)
          .then((result) => {
            setNewPostText("");
            setNewPostImage(null);
            addNewPost(result.data.data);
            toast.success("Posted successfully!", {
              position: "top-right",
              autoClose: 3000,
            });
          })
          .catch((err) => {
            console.log(err);
            toast.warn("Error Occured!");
          });
      }
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
            onChange={(e) => setNewPostImage(e.target.files[0])}
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
