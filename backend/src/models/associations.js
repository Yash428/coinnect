import { User } from "./user.model.js";
import { Post } from "./post.model.js";

// Define associations
User.hasMany(Post, { foreignKey: "user_id" });
Post.belongsTo(User, { foreignKey: "user_id", as: "user" }); // "as" should match query

export { User, Post };