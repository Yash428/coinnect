// import { useEffect, useState } from "react";
// import FollowButton from "./FollowButton";

// const Profile = ({ userId, currentUserId }) => {
//   const [profile, setProfile] = useState({});
//   const [followers, setFollowers] = useState(0);
//   const [following, setFollowing] = useState(0);

//   useEffect(() => {
//     fetch(`/api/user/${userId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setProfile(data);
//         setFollowers(data.followers.length);
//         setFollowing(data.following.length);
//       });
//   }, [userId]);

//   return (
//     <div
//       className="p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
//       style={{ backgroundColor: "#F5F5F5", color: "#333333" }}
//     >
//       <h1 className="text-2xl font-bold">{profile.name}</h1>
//       <p className="text-gray-600">@{profile.username}</p>

//       <div className="mt-4 flex space-x-6 text-lg">
//         <span className="font-semibold" style={{ color: "#28A745" }}>
//           Followers: {followers}
//         </span>
//         <span className="font-semibold" style={{ color: "#FFD700" }}>
//           Following: {following}
//         </span>
//       </div>

//       <div className="mt-4">
//         <FollowButton userId={userId} currentUserId={currentUserId} />
//       </div>
//     </div>
//   );
// };

// export default Profile;
