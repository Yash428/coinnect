import React, { useEffect, useState } from "react";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import "../styles/Doubt.css";
import Image from "../assets/image.png";
import Profile from "../assets/Profile_Photo.png";
import ProfileSection from "./ProfileSection";
import PostComposer from "./PostComposer";
import PostsList from "./PostsList";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Logout from "./Logout";
import { isFinanceRelated } from "./FinanceModerate";

function Doubt() {
  const user0 = useSelector(state=>state.auth.data)
  console.log(user0);
  const navigate = useNavigate()
  const [user, setUser] = useState(user0);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const [filteredPosts, setFilteredPosts] = useState([]); // State for filtered posts
  const [alert, setAlert] = useState({ show: false, message: "" });
  const [posts, setPosts] = useState([]);

  // Handle avatar update
  const updateUserAvatar = (newAvatar) => {
    let data = new FormData()
    data.append('avatar', newAvatar);
    axios.post("http://localhost:8002/api/v1/updateProfile",data,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then(res=>res.data)
    .then(result =>{
      setUser({...user, avatar: result.data.data.avatar});
    })
    .catch(() => console.log("Error updating avatar"));

  };

  useEffect(()=>{
    axios.post("http://localhost:8002/api/v1/commonPosts/getCommon",{},{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
    .then(res=>res.data)
    .then(result=>{
      console.log(result.data);
      setPosts(result.data);
    })
    .catch((error) => {
      console.log(error.status)
      if(error.status === 401){
        localStorage.removeItem('accessToken');
        navigate('/login');
      }
      console.log("Error fetching common posts")});
  },[])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => 
        post.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [posts, searchQuery]);

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
        <Link to={'/welcome'} className="logout-button">
          <FaSignOutAlt />
        </Link>
      </nav>

      <div className="content">
        {/* Sidebar with Profile */}
        <div className="sidebar">
          <ProfileSection user={user} onUpdateAvatar={updateUserAvatar} />
        </div>

        {/* Feed */}
        <div className="feed">
          {/* Post Composer */}
          <PostComposer user={user} onPostSubmit={(newPost) => setPosts([newPost, ...posts])} />

          {/* Posts List */}
          <PostsList posts={posts} user={user} setPosts={setPosts} />
        </div>
      </div>
    </div>
  );
}

export default Doubt;

