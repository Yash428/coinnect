import React, { useState } from "react";
import { FaSearch, FaSignOutAlt, FaThumbsUp, FaComment, FaImage, FaThumbsDown } from "react-icons/fa";
import Image from "../assets/image.png";

function Doubt() {
  const [user, setUser] = useState({
    name: "Dev",
    avatar: Image,
    coins: 200,
  });

  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);

  const handlePostSubmit = () => {
    if (newPostText.trim() || newPostImage) {
      const newPost = {
        id: Date.now(),
        text: newPostText,
        image: newPostImage,
        user: { ...user },
        likes: 0,
        liked: false,
        comments: [],
        showComments: false,
      };
      setPosts([newPost, ...posts]);
      setNewPostText("");
      setNewPostImage(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      <nav className="flex items-center justify-between h-20 px-6 bg-white border-b-2 border-yellow-500 shadow-sm">
        <img src={Image} alt="Logo" className="w-24 h-20" />
        <div className="flex items-center w-1/3 border-2 border-yellow-500 rounded-full overflow-hidden">
          <input type="text" placeholder="Search..." className="flex-1 px-4 py-2 outline-none" />
          <button className="px-4 text-gray-700 hover:text-green-600">
            <FaSearch />
          </button>
        </div>
        <button className="w-20 h-20 flex items-center justify-center text-green-600 bg-white border-2 border-white rounded-full hover:text-yellow-500">
          <FaSignOutAlt />
        </button>
      </nav>

      <div className="flex flex-1">
        <aside className="w-1/5 p-5 bg-white shadow-md">
          <div className="flex flex-col items-center">
            <img src={user.avatar} alt="User Avatar" className="w-24 h-24 rounded-full border-4 border-yellow-500" />
            <p className="mt-2 text-lg font-semibold text-green-600">{user.name}</p>
            <p className="mt-2">Coins: {user.coins}</p>
            <button className="mt-4 w-full px-4 py-2 text-white bg-green-600 rounded-full hover:bg-yellow-500">Join Community</button>
            <button className="mt-2 w-full px-4 py-2 text-white bg-green-600 rounded-full hover:bg-yellow-500">Create Community</button>
          </div>
        </aside>

        <main className="w-4/5 p-5 overflow-y-auto">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-2" />
              <span className="text-lg font-semibold">{user.name}</span>
            </div>
            <textarea className="w-full p-2 border-2 border-green-600 rounded-lg" placeholder="Type something..." value={newPostText} onChange={(e) => setNewPostText(e.target.value)}></textarea>
            <div className="flex items-center justify-between mt-4">
              <label className="cursor-pointer">
                <FaImage className="text-green-600" />
                <input type="file" accept="image/*" className="hidden" onChange={(e) => setNewPostImage(URL.createObjectURL(e.target.files[0]))} />
              </label>
              <button className="px-4 py-2 text-white bg-green-600 rounded-full hover:bg-yellow-500" onClick={handlePostSubmit} disabled={!newPostText.trim() && !newPostImage}>Post</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Doubt;
