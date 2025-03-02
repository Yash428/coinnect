import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AvatarPopup from "./AvatarPopup";

function ProfileSection({ user, onUpdateAvatar }) {

  const [avatar, setAvatar] = useState();
  const [user1, setUser1] = useState(user)

  
  const updateUserAvatar = (e) => {
    let data = new FormData()
    data.append('avatar', avatar);
    axios.post("http://localhost:8002/api/v1/updateProfile",data,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then(res=>res.data)
    .then(result =>{
      console.log(result.data);
      
      setUser1({...user, avatar: result.data.profile_picture});
    })
    .catch(() => {
      console.log(error);
      
      console.log("Error updating avatar")});

  };

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
        <img src={user1.profile_picture} alt="User Avatar" className="user-avatar" />
      </div>
      <p className="username">{user1.name}</p>

      {/* <label className="sidebar-button">
        <p className="Ch">Select Avatar</p>
        <input
          type="file"
          accept="image/*"
          onChange={e=>setAvatar(e.target.files[0])}
          style={{ display: "none" }}
        />
      </label> */}



      <Link to={'/join'} className="sidebar-button">Join Community</Link>
      <Link to={'/create'} className="sidebar-button">Create Community</Link>

      <div className="coins-display">
        <span>Coins: {user1.coins}</span>
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