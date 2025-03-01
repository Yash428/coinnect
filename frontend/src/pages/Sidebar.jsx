import React from 'react'
import {
    FaSearch,
    FaSignOutAlt,
    FaThumbsUp,
    FaComment,
    FaImage,
    FaThumbsDown,
  } from "react-icons/fa";
import "../styles/Doubt.css"
function SideBar({ user, handleAvatarUpload }) {
  return (
    <>
    <div className="sidebar">
      <div className="profile-section">
        <div className="avatar-container">
          <img src={user.avatar} alt="User Avatar" className="user-avatar" />
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

        <button className="sidebar-button">Join Community</button>
        <button className="sidebar-button">Create Community</button>

        <div className="coins-display">
          <span>Coins: {user.coins}</span>
        </div>
      </div>
    </div>
    </>
  )
}

export default SideBar