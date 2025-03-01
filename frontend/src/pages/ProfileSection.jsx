import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProfileSection({ user, onUpdateAvatar }) {
  const [showAvatars, setShowAvatars] = useState(false);
  const [avatar, setAvatar] = useState();
  const [user1, setUser1] = useState(user)
  // const handleAvatarUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       onUpdateAvatar(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  // console.log(user);
  
  useEffect(()=>{
    axios.get("http://localhost:8002/api/v1/getCurrentUser",{},{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      }
    })
    .then(res=>res.data)
    .then(result=>{
      setUser1(result.data);
    })
    .catch(err=>{
      console.error("Failed to fetch user details", err);
    })
  },[])

  return (
    <div className="profile-section">
      <div className="avatar-container">
        <img src={user.profile_picture} alt="User Avatar" className="user-avatar" />
      </div>
      <p className="username">{user.name}</p>

      <label className="sidebar-button">
        <p className="Ch">Change Avatar</p>
        <input
          type="file"
          accept="image/*"
          onChange={e=>setAvatar(e.target.files[0])}
          style={{ display: "none" }}
        />
      </label>

      {showAvatars && (
        <div className="avatar-options">
          {/* If you have avatar options, map them here */}
        </div>
      )}

      <Link to={'/join'} className="sidebar-button">Join Community</Link>
      <Link to={'/create'} className="sidebar-button">Create Community</Link>

      <div className="coins-display">
        <span>Coins: {user.coins}</span>
        <div className="coin-stack">
          <div className="coin"></div>
          <div className="coin"></div>
          <div className="coin"></div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSection;