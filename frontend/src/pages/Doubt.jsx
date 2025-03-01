import React, { useEffect, useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import {
  FaSearch,
  FaSignOutAlt,
  FaThumbsUp,
  FaComment,
  FaImage,
  FaThumbsDown,
} from "react-icons/fa";
import "../styles/Doubt.css";
import Image from "../assets/image.png";
import axios from "axios";
import {useSelector} from "react-redux"
import { toast } from "react-toastify";
import Logout from "./Logout";


function Doubt() {
  const user0 = useSelector(state=>state.auth.data)
  const [user, setUser] = useState({
    name: user0.full_name,
    avatar: user0.avatar|| Image,
    coins: user0.coins || 200,
  });

  const [showAvatars, setShowAvatars] = useState(false);
  const [posts, setPosts] = useState([]);

  // New post state
  const [newPostText, setNewPostText] = useState("");
  const [newPostImage, setNewPostImage] = useState('');

  // Avatar options
  useEffect(()=>{
    axios.post('http://localhost:8002/api/v1/commonPosts/getCommon',{},{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
    .then(res=>res.data)
    .then(result=>{
      console.log(result.data);
      setPosts(result.data);
    })
    .catch(err=>{
      console.error("Failed to fetch common posts", err);

    })
  },[])
  // Handle post submission
  const handlePostSubmit = () => {
    if (newPostText.trim() || newPostImage) {
      const newPost = {
        id: Date.now(),
        text: newPostText,
        image: newPostImage,
        user: { ...user },
        likes: 0,
        liked: false,
        comments: [],
        showComments: false,
        showCommentInput: false,
        newCommentText: "",
        newCommentImage: null,
      };
      let data = new FormData()
      data.append('content', newPostText)
      data.append('image', newPostImage)
      axios.post('http://localhost:8002/api/v1/commonPosts/addPost',data,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(res=>res.data)
      .then(result =>{
        setPosts([newPost, ...posts]);
        setNewPostText("");
        setNewPostImage(null);
        toast.success("Posted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      })
      .catch(err=>{
        console.log(err);
        toast.warn("Error Occured!");
      })
    }
  }

  // Handle image upload for new post
  const handlePostImageChange = (e) => {
    setNewPostImage(e.target.files[0])
  };
  
  // Toggle comment input visibility
  const toggleCommentInput = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            showCommentInput: !post.showCommentInput,
          };
        }
        return post;
      })
    );
  };

  // Toggle comments visibility
  const toggleComments = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            showComments: !post.showComments,
          };
        }
        return post;
      })
    );
  };

  // Update comment text for a post
  const updateCommentText = (postId, text) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            newCommentText: text,
          };
        }
        return post;
      })
    );
  };

  // Handle image upload for comment
  const handleCommentImageChange = (postId, e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPosts(
          posts.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                newCommentImage: event.target.result,
              };
            }
            return post;
          })
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
          if (post.newCommentText.trim() || post.newCommentImage) {
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

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Change user avatar
  const changeAvatar = (newAvatar) => {
    setUser({ ...user, avatar: newAvatar });
    setShowAvatars(false);
  };

  // const handleReaction = (postId, action) => {
  //   setPosts(
  //     posts.map((post) => {
  //       if (post.id === postId) {
  //         let updatedPost = { ...post };

  //         if (action === "like") {

  //           if (post.liked) {
  //             // If already liked, remove like
  //             updatedPost.likes -= 1;
  //             updatedPost.liked = false;
  //           } else {
  //             // Otherwise, like the post
  //             updatedPost.likes += 1;
  //             updatedPost.liked = true;

  //             // If disliked, remove dislike
  //             if (post.disliked) {
  //               updatedPost.dislikes -= 1;
  //               updatedPost.disliked = false;
  //             }
  //           }
  //         } else if (action === "dislike") {
  //           if (post.disliked) {
  //             // If already disliked, remove dislike
  //             updatedPost.dislikes -= 1;
  //             updatedPost.disliked = false;
  //           } else {
  //             // Otherwise, dislike the post
  //             updatedPost.dislikes += 1;
  //             updatedPost.disliked = true;

  //             // If liked, remove like
  //             if (post.liked) {
  //               updatedPost.likes -= 1;
  //               updatedPost.liked = false;
  //             }
  //           }
  //         }
  //         return updatedPost;
  //       }
  //       return post;
  //     })
  //   );
  // };

  // const handleReaction = useCallback((postId, action) => {
  //   const apiUrl = `http://localhost:8002/api/v1/commonPosts/${action}`;
  //   console.log(postId);
    
  //   axios.post(apiUrl, { postId }, {
  //     headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  //   })
  //   .then(() => {
  //     setPosts(prevPosts => prevPosts.map(post => {
  //       if (post.id !== postId) return post;
        
  //       const updatedPost = { ...post };
        
  //       if (action === "like") {
  //         updatedPost.liked = !post.liked;
  //         updatedPost.likes += post.liked ? -1 : 1;
  //         if (post.disliked) {
  //           updatedPost.disliked = false;
  //           updatedPost.dislikes -= 1;
  //         }
  //       } else if (action === "dislike") {
  //         updatedPost.disliked = !post.disliked;
  //         updatedPost.dislikes += post.disliked ? -1 : 1;
  //         if (post.liked) {
  //           updatedPost.liked = false;
  //           updatedPost.likes -= 1;
  //         }
  //       }
        
  //       return updatedPost;
  //     }));
  //   })
  //   .catch(() => toast.warn("Error updating reaction"));
  // }, []);

  const handleReaction = useCallback((postId, action) => {
    const apiUrl = `http://localhost:8002/api/v1/commonPosts/${action}`;
    
    axios.post(apiUrl, { postId }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    })
    .then((res) => {
      console.log(res.data.data);
      
      setPosts(prevPosts => prevPosts.map(post => {
        if (post.id !== postId) return post;
        
        return {
          ...post,
          likes: res.data.data.likes,
          dislikes: res.data.data.dislikes,
          liked: res.data.data.liked,
          disliked: !res.data.data.liked,
        };
      }));
    })
    .catch(() => toast.warn("Error updating reaction"));
  }, []);

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={Image} alt="" />
        </div>
        <div className="search-box">
          <input type="text" placeholder="Search..." />
          <button className="search-button">
            <FaSearch />
          </button>
        </div>
        <div className="logout-button">
          <FaSignOutAlt /> <Logout />
        </div>
      </nav>

      {/* Main Content */}
      <div className="content">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="profile-section">
            {/* <div className="avatar-container">
              <img src={user.avatar} alt="User Avatar" className="user-avatar" />
            </div>
            <h2 className="username">{user.name}</h2>
            
            <button className="sidebar-button">Change Avatar</button>
            <div className="avatar-options">
              {avatarOptions.map((avatar, index) => (
                <img 
                  key={index}
                  src={avatar}
                  alt={`Avatar option ${index + 1}`}
                  className="avatar-option"
                  onClick={() => changeAvatar(avatar)}
                />
              ))}
            </div> */}

            {/* <div className="avatar-container">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="user-avatar"
              />
            </div>
            <p className="username">{user.name}</p>

            <button
              className="sidebar-button"
              onClick={() => setShowAvatars(!showAvatars)}
            >
              Change Avatar
            </button> */}

            <div className="avatar-container">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="user-avatar"
              />
            </div>
            <p className="username">{user.name}</p>

            <label className="sidebar-button">
              <p className="Ch">Change Avatar</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                style={{ display: "none" }}
              />
            </label>

            {showAvatars && (
              <div className="avatar-options">
                {avatarOptions.map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar}
                    alt={`Avatar option ${index + 1}`}
                    className="avatar-option"
                    onClick={() => changeAvatar(avatar)}
                  />
                ))}
              </div>
            )}

            <button className="sidebar-button">Join Community</button>
            <button className="sidebar-button">Create Community</button>

            <div className="coins-display">
              <span>Coins: {user.coins}</span>
              <div className="coin-stack">
                <div className="coin"></div>
                <div className="coin"></div>
                <div className="coin"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Feed */}
        <div className="feed">
          {/* Post Composer */}
          <div className="post-composer">
            <div className="composer-header">
              <img
                src={user.avatar}
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

          {/* Posts List */}
          <div className="posts-container">
            {posts.map((post, index) => (
              <div key={index} className="post">
                <div className="post-header">
                  <img
                    src={post.user.avatar || Image}
                    alt={post.user.name}
                    className="user-avatar-small"
                  />
                  <span className="post-username-small">{post.user.name}</span>
                </div>

                <div className="post-content">
                  {post.content && <p>{post.content}</p>}
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post content"
                      className="post-image"
                    />
                  )}
                </div>

                {/* <div className="post-actions">
                  <button
                    className={`like-button ${post.liked ? "liked" : ""}`}
                    onClick={() => handleLikePost(post.id)}
                  >
                    <FaThumbsUp /> {post.likes > 0 && post.likes}
                  </button>

                  <button
                    className={`dislike-button ${
                      post.disliked ? "disliked" : ""
                    }`}
                    onClick={() => handleDislikePost(post.id)}
                  >
                    <FaThumbsDown /> {post.dislikes > 0 && post.dislikes}
                  </button>

                  <button
                    className="comment-button"
                    onClick={() => toggleCommentInput(post.id)}
                  >
                    <FaComment />{" "}
                    {post.comments.length > 0 && post.comments.length}
                  </button>
                </div> */}

                <div className="post-actions">
                  {/* Like Button */}
                  <button
                    className={`like-button ${post.liked ? "liked" : ""}`}
                    onClick={() => handleReaction(post.post_id, "like")}
                  >
                    <FaThumbsUp /> {post.likes}
                  </button>

                  {/* Dislike Button */}
                  <button
                    className={`dislike-button ${
                      post.disliked ? "disliked" : ""
                    }`}
                    onClick={() => handleReaction(post.post_id, "dislike")}
                  >
                    <FaThumbsDown /> {post.dislikes > 0 && post.dislikes}
                  </button>

                  {/* Comment Button */}
                  <button
                    className="comment-button"
                    onClick={() => toggleCommentInput(post.id)}
                  >
                    <FaComment />{" "}
                    {post.comments.length > 0 && post.comments.length}
                  </button>
                </div>

                {post.showCommentInput && (
                  <div className="comment-composer">
                    <div className="composer-header-small">
                      <img
                        src={user.avatar || Image}
                        alt={user.name}
                        className="user-avatar-tiny"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={post.newCommentText || ""}
                      onChange={(e) =>
                        updateCommentText(post.id, e.target.value)
                      }
                      className="comment-input"
                    />

                    {post.newCommentImage && (
                      <div className="image-preview-small">
                        <img src={post.newCommentImage} alt="Comment preview" />
                        <button
                          onClick={() =>
                            setPosts(
                              posts.map((p) =>
                                p.id === post.id
                                  ? { ...p, newCommentImage: null }
                                  : p
                              )
                            )
                          }
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
                          onChange={(e) => handleCommentImageChange(post.id, e)}
                          style={{ display: "none" }}
                        />
                      </label>
                      <button
                        className="comment-button-small"
                        onClick={() => addComment(post.id)}
                        disabled={
                          !post.newCommentText?.trim() && !post.newCommentImage
                        }
                      >
                        Send
                      </button>
                    </div>
                  </div>
                )}

                {post.comments.length > 0 && (
                  <div className="comments-section">
                    <button
                      className="toggle-comments"
                      onClick={() => toggleComments(post.id)}
                    >
                      {post.showComments ? "Hide" : "Show"}{" "}
                      {post.comments.length} comments
                    </button>

                    {post.showComments && (
                      <div className="comments-list">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="comment">
                            <div className="comment-header">
                              <img
                                src={comment.user.avatar || Image}
                                alt={comment.user.name}
                                className="user-avatar-tiny"
                              />
                              <span className="username-tiny">
                                {comment.user.name}
                              </span>
                            </div>

                            <div className="comment-content">
                              {comment.text && <p>{comment.text}</p>}
                              {comment.image && (
                                <img
                                  src={comment.image}
                                  alt="Comment content"
                                  className="comment-image"
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Doubt;
