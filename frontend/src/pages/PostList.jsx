import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { FaImage, FaHeart } from "react-icons/fa";
import axios from "axios";

function PostList() {
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      async function fetchPosts() {
        try {
          const response = await axios.get("/api/posts");
          setPosts(response.data);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      }
      fetchPosts();
    }, []);
  
    return (
      <section className="w-4/5 p-5">
        {posts.map((post) => (
          <div key={post.id} className="p-4 bg-white rounded-lg shadow-md mb-4">
            <div className="flex items-center mb-2">
              <img
                src={post.user?.avatar || "default-avatar.png"}
                alt={post.user?.full_name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="font-semibold">{post.user?.full_name}</span>
            </div>
            <p className="mb-2">{post.content}</p>
            {post.image && <img src={post.image} alt="Post" className="w-full rounded-md" />}
            <div className="flex items-center mt-2">
              <FaHeart className="text-red-500" />
              <span className="ml-2">{post.likes_count} Likes</span>
            </div>
          </div>
        ))}
      </section>
    );
  }

export default PostList;