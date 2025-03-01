import React from "react";
import Post from "./Post";
import axios from "axios"; // Import axios for API calls

function PostsList({ posts, user, setPosts }) {
  // Toggle comment input visibility
  const toggleCommentInput = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, showCommentInput: !post.showCommentInput }
          : post
      )
    );
  };

  // Toggle comments visibility
  const toggleComments = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, showComments: !post.showComments }
          : post
      )
    );
  };

  // Update comment text for a post
  const updateCommentText = (postId, text) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, newCommentText: text } : post
      )
    );
  };

  // Handle image upload for comment
  const handleCommentImageChange = (postId, e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPosts(
          posts.map((post) =>
            post.id === postId
              ? { ...post, newCommentImage: event.target.result }
              : post
          )
        );
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Add comment to a post
  const addComment = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          if (post.newCommentText?.trim() || post.newCommentImage) {
            const newComment = {
              id: Date.now(),
              text: post.newCommentText,
              image: post.newCommentImage,
              user: { ...user },
            };
            return {
              ...post,
              comments: [...post.comments, newComment],
              newCommentText: "",
              newCommentImage: null,
              showCommentInput: false,
              showComments: true,
            };
          }
        }
        return post;
      })
    );
  };

  // Handle like/dislike reactions via API
  const handleReaction = (postId, action) => {
    try {
      axios.post(`http://localhost:8002/api/v1/commonPosts/${action}`,{ postId },
        { 
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then(res=>{
        setPosts(
          posts.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                likes: response.data.data.likes,
                dislikes: response.data.data.dislikes,
                liked: response.data.data.liked,
                disliked: response.data.data.disliked,
              };
            }
            return post;
          })
        );
      })
      .catch(error=>{
        console.error(`Error handling ${action}:`, error.response?.data?.message || error.message);
      });

    } catch (error) {
      console.error(`Error handling ${action}:`, error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="posts-container">
      {posts.map((post, index) => (
        <Post
          key={index}
          post={post}
          user={user}
          onToggleCommentInput={toggleCommentInput}
          onToggleComments={toggleComments}
          onUpdateCommentText={updateCommentText}
          onCommentImageChange={handleCommentImageChange}
          onAddComment={addComment}
          onReaction={handleReaction}
        />
      ))}
    </div>
  );
}

export default PostsList;
