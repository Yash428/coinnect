import React, { useEffect, useState } from "react";


function Comment({ comment }) {
    console.log(comment);
    
  return (
    <div className="comment">
      <div className="comment-header">
        <img
          src={comment.profile_picture}
          alt={comment.user_name}
          className="user-avatar-tiny"
        />
        <span className="username-tiny">{comment.user_name}</span>
      </div>

      <div className="comment-content">
        {comment.content && <p>{comment.content}</p>}
      </div>
    </div>
  );
}

export default Comment;