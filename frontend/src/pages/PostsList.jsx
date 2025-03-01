import React, {useState, useEffect} from "react";
import Post from "./Post";
import axios from "axios"; // Import axios for API calls

function PostsList() {
  const [posts, setPosts] = useState([]);
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

  return (
    <div className="posts-container">
      {posts.map((post, index) => (
        <Post
          key={index}
          post={post}
        />
      ))}
    </div>
  );
}

export default PostsList;
