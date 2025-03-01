import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { FaImage, FaHeart } from "react-icons/fa";
import axios from "axios";

function Post({ user, handlePostSubmit }) {
  const [newPostText, setNewPostText] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);

  const submitPost = async () => {
    try {
      const response = await axios.post("/api/posts", {
        content: newPostText,
        image: newPostImage,
        user_id: user.id,
      });
      handlePostSubmit(response.data);
      setNewPostText("");
      setNewPostImage(null);
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  return (
    <main className="w-4/5 p-5 overflow-y-auto">
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <img
            src={user.avatar || "default-avatar.png"}
            alt={user.full_name}
            className="w-10 h-10 rounded-full mr-2"
          />
          <span className="text-lg font-semibold">{user.full_name}</span>
        </div>
        <textarea
          className="w-full p-2 border-2 border-green-600 rounded-lg"
          placeholder="Type something..."
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
        ></textarea>
        <div className="flex items-center justify-between mt-4">
          <label className="cursor-pointer">
            <FaImage className="text-green-600" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                setNewPostImage(URL.createObjectURL(e.target.files[0]))
              }
            />
          </label>
          <button
            className="px-4 py-2 text-white bg-green-600 rounded-full hover:bg-yellow-500"
            onClick={submitPost}
            disabled={!newPostText.trim() && !newPostImage}
          >
            Post
          </button>
        </div>
      </div>
    </main>
  );
}
