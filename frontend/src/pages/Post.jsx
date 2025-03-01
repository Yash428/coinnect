import React, { useEffect, useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaComment, FaImage } from "react-icons/fa";
import Comment from "./Comment";
import axios from "axios";

function Post({
  post,
  user,
  onToggleCommentInput,
  onToggleComments,
  onUpdateCommentText,
  onCommentImageChange,
  onAddComment,
  onReaction
}) {
  // console.log(post);
  const [post1, setPost1] = useState(post)
  const [likes, setLikes] = useState(post.likes)
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [comments, setComments] = useState(post.comments)
  const [commentInput, setCommentInput] = useState("");


  useEffect(()=>{
    axios.post("http://localhost:8002/api/v1/commonPosts/getPostById",{postId:post.post_id},{
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then(response=>{
      console.log(response.data.data);
      setPost1(response.data.data)
      setLikes(response.data.data.likes)
      setIsLiked(response.data.data.isLiked)
    })
    .catch(error=>{
      console.error(`Error fetching post:`, error.response?.data?.message || error.message);
    })
  },[])
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
      .then(response=>{
        if(isLiked){
          setLikes(likes - 1);
          setIsLiked(false);
        }
        else{
          setLikes(likes + 1);
          setIsLiked(true);
        }
      })
      .catch(error=>{
        console.error(`Error handling ${action}:`, error.response?.data?.message || error.message);
      })

    } catch (error) {
      console.error(`Error handling ${action}:`, error.response?.data?.message || error.message);
    }
  };

  const submitComment = (e) =>{
    axios.post("http://localhost:8002/api/v1/commonPosts/addComment",{
      postId: post1.post_id,
      comment: commentInput
    },{
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then(response=>{
      // setComments(response.data.data)
      // setCommentInput("")
      console.log(response.data.data);
      
    })
    .catch(error=>{
      console.error(`Error submitting comment:`, error.response?.data?.message || error.message);
    })
  } 
  return (
    <div className="post">
      <div className="post-header">
        <img
          src={post1.user.avatar}
          alt={post1.user.name}
          className="user-avatar-small"
        />
        <span className="post-username-small">{post1.user.name}</span>
      </div>

      <div className="post-content">
        {post1.content && <p>{post1.content}</p>}
        {post1.image && (
          <img src={post1.image} alt="Post content" className="post-image" />
        )}
      </div>

      <div className="post-actions">
        {/* Like Button */}
        <button
          className={`like-button ${isLiked ? "liked" : ""}`}
          onClick={() => handleReaction(post1.post_id, "like")}
        >
          <FaThumbsUp /> {likes > 0 && likes}
        </button>

        {/* Comment Button */}
        <button
          className="comment-button"
          onClick={() => onToggleCommentInput(post.post_id)}
        >
          <FaComment /> {post.comments.length > 0 && post.comments.length}
        </button>
      </div>

      {/* Comment Input Section */}
      {post.showCommentInput && (
        <div className="comment-composer">
          <div className="composer-header-small">
            <img
              src={user.avatar}
              alt={user.name}
              className="user-avatar-tiny"
            />
          </div>

          <input
            type="text"
            placeholder="Write a comment..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            className="comment-input"
          />

          {post.newCommentImage && (
            <div className="image-preview-small">
              <img src={post.newCommentImage} alt="Comment preview" />
              <button
                onClick={() => onUpdateCommentText(post.id, "")}
                className="remove-image-small"
              >
                ×
              </button>
            </div>
          )}

          <div className="composer-actions-small">
            <label className="upload-image-button-small">
              <FaImage />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => onCommentImageChange(post.id, e)}
                style={{ display: "none" }}
              />
            </label>
            <button
              className="comment-button-small"
              onClick={() => onAddComment(post.id)}
              disabled={!post.newCommentText?.trim() && !post.newCommentImage}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Comments List Section */}
      {post.comments.length > 0 && (
        <div className="comments-section">
          <button
            className="toggle-comments"
            onClick={() => onToggleComments(post.id)}
          >
            {post.showComments ? "Hide" : "Show"} {post.comments.length} comments
          </button>

          {post.showComments && (
            <div className="comments-list">
              {post.comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Post;