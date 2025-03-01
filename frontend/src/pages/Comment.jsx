import React from "react";

function Comment({ comment }) {
    console.log(comment);
    
  return (
    <div className="comment">
      <div className="comment-header">
        <img
          src={comment.user.avatar}
          alt={comment.user.name}
          className="user-avatar-tiny"
        />
        <span className="username-tiny">{comment.user.name}</span>
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
  );
}

export default Comment;