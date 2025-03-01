import React, {useState, useEffect} from "react";
import Post from "./Post";
import axios from "axios"; // Import axios for API calls
import {useNavigate} from "react-router-dom"

function PostsList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate()
  useEffect(()=>{
    const fetchPosts = async ()=>{
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
        // moderatePosts(result.data)
      })
      .catch((error) => {
        console.log(error.status)
        if(error.status === 401){
          localStorage.removeItem('accessToken');
          navigate('/login');
        }
        console.log("Error fetching common posts")});
    }
    


      // axios.post("http://localhost:8002/api/v1/commonPosts/moderateContent",{posts},{
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      //     "Content-Type": "application/json",
      //   },
      // })
      // .then(res=>res.data)
      // .then(result=>{
      //   console.log(result.data);
      //   setPosts(result.data);
      // })
      // .catch((error) => {
      //   console.log(error.status)
      //   if(error.status === 401){
      //     localStorage.removeItem('accessToken');
      //     navigate('/login');
      //   }
      //   console.log("Error fetching common posts")});
      // const moderatePosts = async (fetchedPosts) => {
      //   try {
      //     const response = await axios.post(
      //       "http://localhost:8002/api/v1/commonPosts/moderateContent",
      //       { posts: fetchedPosts },
      //       {
      //         headers: {
      //           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      //           "Content-Type": "application/json",
      //         },
      //       }
      //     );
  
      //     if (response.data && response.data.data) {
      //       setPosts(response.data.data);
      //     }
      //   } catch (error) {
      //     console.error("Error moderating posts:", error);
      //     if (error.response?.status === 401) {
      //       localStorage.removeItem("accessToken");
      //       navigate("/login");
      //     }
      //   }
      // };
      fetchPosts()
    },[navigate])

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
