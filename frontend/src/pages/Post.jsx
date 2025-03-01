import React, { useEffect, useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaComment, FaImage } from "react-icons/fa";
import Comment from "./Comment";
import axios from "axios";
import {useSelector} from "react-redux"
import {HiTranslate} from "react-icons/hi"
function Post({
  post
}) {
  // console.log(post);
  const [post1, setPost1] = useState(post)
  const [likes, setLikes] = useState(post.likes)
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [comments, setComments] = useState(post.comments)
  const [commentInput, setCommentInput] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentCount, setCommentCount] = useState(post.comments.length)
  const [showComments, setShowComments] = useState(post.showComments);
  const currentUser = useSelector(state=>state.auth.data)
  const [translatedText, setTranslatedText] = useState(post.content);
  const [selectedLang, setSelectedLang] = useState("en");

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "hi", name: "Hindi" },
    { code: "zh", name: "Chinese" },
    { code: "ar", name: "Arabic" },
  ];

  const translatePost = () => {

    axios.get(`https://lingva.ml/api/v1/auto/${selectedLang}/${encodeURIComponent(post1.content)}`)
      .then(response => {
        console.log(response.data);
        
        setTranslatedText(response.data.translation)})
      .catch(error => console.error("Error translating text:", error));

  };

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

  const toggleComments = () => {
    setShowComments(!showComments);
  };
  const submitComment = (e) =>{
    axios.post("http://localhost:8002/api/v1/commonPosts/addComment",{
      postId: post1.post_id,
      content: commentInput
    },{
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then(response=>{
      setComments(response.data.data.allComments)
      setCommentInput("")
      // console.log(response.data.data.allComments);
      setCommentCount(response.data.data.allComments.length)
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
        {translatedText && <p>{translatedText}</p>}
        
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
          onClick={(e) => setShowCommentInput(prev=>!prev)}
        >
          <FaComment /> {commentCount > 0 && commentCount}
        </button>
        <select  value={selectedLang} onChange={e=>setSelectedLang(e.target.value)}>
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>{lang.name}</option>
          ))}
        </select>
        <button
          className="comment-button"
          onClick={translatePost}
        >
          <HiTranslate /> Translate
        </button>
      
      </div>

      {/* Comment Input Section */}
      {showCommentInput && (
        <div className="comment-composer">
          <div className="composer-header-small">
            <img
              src={currentUser.profile_picture}
              alt={currentUser.full_name}
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

          {/* {post.newCommentImage && (
            <div className="image-preview-small">
              <img src={post.newCommentImage} alt="Comment preview" />
              <button
                onClick={() => onUpdateCommentText(post.id, "")}
                className="remove-image-small"
              >
                ×
              </button>
            </div>
          )} */}

          <div className="composer-actions-small">
            <button
              className="comment-button-small"
              onClick={submitComment}
              disabled={!commentInput?.trim()}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Comments List Section */}
      {commentCount > 0 && (
        <div className="comments-section">
          <button
            className="toggle-comments"
            onClick={toggleComments}
          >
            {showComments ? "Hide" : "Show"} {commentCount} comments
          </button>

          {showComments && (
            <div className="comments-list">
              {comments.map((comment) => (
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