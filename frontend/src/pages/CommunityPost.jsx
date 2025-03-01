import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaImage } from "react-icons/fa";
import "../styles/CommunityPost.css";

// const CommunityPost = () => {
//   const { communityId } = useParams();
//   const navigate = useNavigate();
//   const parsedCommunityId = parseInt(communityId);

//   // Get initial data from localStorage
//   const getInitialCommunities = () => {
//     const savedCommunities = localStorage.getItem("communities");
//     return savedCommunities ? JSON.parse(savedCommunities) : [];
//   };

//   const getJoinedCommunities = () => {
//     const savedJoined = localStorage.getItem("userJoinedCommunities");
//     return savedJoined ? JSON.parse(savedJoined) : [];
//   };

//   const getInitialPosts = () => {
//     const savedPosts = localStorage.getItem("communityPosts");
//     return savedPosts ? JSON.parse(savedPosts) : [];
//   };

//   // States
//   const [communities, setCommunities] = useState(getInitialCommunities);
//   const [userJoinedCommunities, setUserJoinedCommunities] = useState(getJoinedCommunities);
//   const [currentCommunity, setCurrentCommunity] = useState(null);
//   const [posts, setPosts] = useState(getInitialPosts);
//   const [newPostContent, setNewPostContent] = useState("");
//   const [isCreator, setIsCreator] = useState(false);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [postToDelete, setPostToDelete] = useState(null);

//   // Find the current community on component mount
//   useEffect(() => {
//     const community = communities.find((c) => c.id === parsedCommunityId);
//     if (community) {
//       setCurrentCommunity(community);
//       // Check if current user is the creator (in a real app, would compare with logged-in user)
//       setIsCreator(community.created_by === "currentUser");
//     } else {
//       // Community not found, redirect to browse page
//       navigate("/");
//     }
//   }, [parsedCommunityId, communities, navigate]);

//   // Save posts to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem("communityPosts", JSON.stringify(posts));
//   }, [posts]);

//   // Handle image selection
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Remove selected image
//   const removeImage = () => {
//     setImagePreview(null);
//     setImageFile(null);
//   };

//   // Create a new post
//   const handleCreatePost = (e) => {
//     e.preventDefault();

//     if (!newPostContent.trim() && !imagePreview) {
//       alert("Post content cannot be empty");
//       return;
//     }

//     // Generate new post ID
//     const newPostId =
//       posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1;

//     // Create the new post
//     const newPost = {
//       id: newPostId,
//       communityId: parsedCommunityId,
//       content: newPostContent,
//       imageUrl: imagePreview, // Store the image as base64 data URL
//       authorId: "currentUser", // In a real app, this would be the logged-in user id
//       authorName: "currentUser", // In a real app, this would be the logged-in username
//       createdAt: new Date().toISOString(),
//       likes: 0,
//       comments: [],
//     };

//     // Add new post to the posts array
//     setPosts([newPost, ...posts]);

//     // Reset form
//     setNewPostContent("");
//     setImagePreview(null);
//     setImageFile(null);
//   };

//   // Filter posts for the current community
//   const communityPosts = posts.filter(
//     (post) => post.communityId === parsedCommunityId
//   );

//   // Format date for display
//   const formatDate = (dateString) => {
//     const options = {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   // Delete post handler
//   const handleDeletePost = (postId) => {
//     const postToRemove = posts.find((post) => post.id === postId);
//     setPostToDelete(postToRemove);
//     setShowConfirmation(true);
//   };

//   // Confirm post deletion
//   const confirmDeletePost = () => {
//     if (postToDelete) {
//       setPosts(posts.filter((post) => post.id !== postToDelete.id));
//       setShowConfirmation(false);
//       setPostToDelete(null);
//     }
//   };

//   // Cancel post deletion
//   const cancelDeletePost = () => {
//     setShowConfirmation(false);
//     setPostToDelete(null);
//   };

//   // Like post handler
//   const handleLikePost = (postId) => {
//     setPosts(
//       posts.map((post) =>
//         post.id === postId ? { ...post, likes: post.likes + 1 } : post
//       )
//     );
//   };

//   // Check if user is a member of the community
//   const isMember = userJoinedCommunities.some(
//     (c) => c.id === parsedCommunityId
//   );

//   // If user is not a member, redirect to join page
//   useEffect(() => {
//     if (currentCommunity && !isMember) {
//       navigate("/join");
//     }
//   }, [currentCommunity, isMember, navigate]);

//   if (!currentCommunity) {
//     return <div className="cp-loading">Loading community...</div>;
//   }

//   return (
//     <div className="cp-post-page">
//       <header className="cp-header">
//         <div className="cp-header-content">
//           <h1>{currentCommunity.name}</h1>
//           <p className="cp-community-description">
//             {currentCommunity.description}
//           </p>
//           <div className="cp-community-meta">
//             <span>{currentCommunity.members_count} members</span>
//             <span>Created: {formatDate(currentCommunity.createdAt)}</span>
//           </div>
//         </div>
//         <div className="cp-header-navigation">
//           <Link to="/join" className="cp-nav-btn">
//             Join Communities
//           </Link>
//         </div>
//       </header>

//       <div className="cp-community-content">
//         {isCreator && (
//           <div className="cp-create-post-section">
//             <h2 className="N">Create New Post</h2>
//             <form onSubmit={handleCreatePost} className="cp-post-form">
//               <textarea
//                 placeholder="What's on your mind?"
//                 value={newPostContent}
//                 onChange={(e) => setNewPostContent(e.target.value)}
//                 rows="4"
//               />

//               <div className="cp-post-actions">
//                 <div className="cp-file-input-container">
//                   <label htmlFor="image-upload" className="cp-file-input-label">
//                     <FaImage size={20} />
//                   </label>
//                   <input
//                     id="image-upload"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     className="cp-file-input"
//                   />
//                 </div>

//                 <button type="submit" className="cp-post-btn">
//                   Post
//                 </button>
//               </div>

//               {imagePreview && (
//                 <div className="cp-image-preview-container">
//                   <img
//                     src={imagePreview}
//                     alt="Preview"
//                     className="cp-image-preview"
//                   />
//                   <button
//                     type="button"
//                     className="cp-remove-image-btn"
//                     onClick={removeImage}
//                   >
//                     ✖
//                   </button>
//                 </div>
//               )}
//             </form>
//           </div>
//         )}

//         <div className="cp-posts-container">
//           <h2>Community Posts</h2>

//           {communityPosts.length > 0 ? (
//             <div className="cp-posts-list">
//               {communityPosts.map((post) => (
//                 <div key={post.id} className="cp-post-card">
//                   <div className="cp-post-header">
//                     <div className="cp-post-author">{post.authorName}</div>
//                     <div className="cp-post-date">
//                       {formatDate(post.createdAt)}
//                     </div>
//                   </div>

//                   <div className="cp-post-content">
//                     {post.content && <p>{post.content}</p>}
//                     {post.imageUrl && (
//                       <div className="cp-post-image-container">
//                         <img
//                           src={post.imageUrl}
//                           alt="Post"
//                           className="cp-post-image"
//                         />
//                       </div>
//                     )}
//                   </div>

//                   <div className="cp-post-footer">
//                     <button
//                       className="cp-like-btn"
//                       onClick={() => handleLikePost(post.id)}
//                     >
//                       👍 {post.likes}
//                     </button>

//                     {isCreator && post.authorId === "currentUser" && (
//                       <button
//                         className="cp-delete-btn"
//                         onClick={() => handleDeletePost(post.id)}
//                       >
//                         🗑️ Delete
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="cp-no-posts">
//               <p>No posts in this community yet.</p>
//               {isCreator && <p>Be the first to create a post!</p>}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Confirmation Dialog for Post Deletion */}
//       {showConfirmation && (
//         <div className="cp-confirmation-overlay">
//           <div className="cp-confirmation-dialog">
//             <h3>Delete Post</h3>
//             <p>
//               Are you sure you want to delete this post? This action cannot be
//               undone.
//             </p>
//             <div className="cp-confirmation-actions">
//               <button className="cp-cancel-btn" onClick={cancelDeletePost}>
//                 Cancel
//               </button>
//               <button className="cp-confirm-btn" onClick={confirmDeletePost}>
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CommunityPost;

// import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import PostComposer from './PostComposer'
import PostList from './PostsList'
import "../styles/Doubt.css";
import axios from "axios";

function CommunityPost() {
  const {communityId} = useParams()
  console.log(communityId);
  const navigate = useNavigate()
  
  const [posts, setPosts] = useState([])
  const user = useSelector(state => state.auth.data)
  useEffect(()=>{
    axios.post("http://localhost:8002/api/v1/commonPosts/getCommunityPostsById",{
      community_id: communityId
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        "Content-Type": "application/json",
      },
    })
    .then(res=>res.data)
    .then(result=>{
      console.log(result.data);
      setPosts(result.data);
      // moderatePosts(result.data)
    })
    .catch((error) => {
      console.log(error.status)
      if(error.status === 401){
        localStorage.removeItem('accessToken');
        navigate('/login');
      }
      console.log("Error fetching common posts")});
  },[])
  const addNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]); // Add new post at the top
  };

  return (
    <div>      
      {/* Post Composer */}
      <PostComposer user={user} community_id={communityId} addNewPost={addNewPost} />
      
      {/* Post List */}
      <PostList posts={posts} community_id={communityId} />
    </div>
  )
}

export default CommunityPost
