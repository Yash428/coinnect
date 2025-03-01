import React, {useState, useEffect} from "react";
import Post from "./Post";
import axios from "axios"; // Import axios for API calls
import {useNavigate} from "react-router-dom"

function PostsList({
  community_id
}) {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate()
  const [community_id1, setCommunity_id1] = useState(community_id)
  useEffect(()=>{
    const fetchPosts = async ()=>{
      if(community_id1 === undefined){
        axios.post("http://localhost:8002/api/v1/commonPosts/getCommon",{},{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            "Content-Type": "application/json",
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
      }
      else{
        axios.post("http://localhost:8002/api/v1/commonPosts/getCommunityPostsById",{
          community_id
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
        })
        .catch((error) => {
          console.log(error.status)
          if(error.status === 401){
            localStorage.removeItem('accessToken');
            navigate('/login');
          }
          console.log("Error fetching common posts")});
      } 
    }
      fetchPosts()
    },[])

  return (
    <div className="posts-container">
      {posts.length>0 ?(posts.map((post, index) => (
        <Post
          key={index}
          post={post}
        />
      ))):(
        <div className="text-center">No posts available.</div>
      )}
      
    </div>
  );
}

export default PostsList;
