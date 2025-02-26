import {DataTypes} from "sequelize"
import { connectDb } from "../db/index.js"

const sequelize = await connectDb()

const Post = sequelize.define("Post", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING, // Optional image for posts
        allowNull: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "Users",
            key: "id"
        },
        onDelete: "CASCADE"
    },
    community_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "Communities",
            key: "id"
        },
        allowNull: true, // If null, it's a personal post (like Twitter)
        onDelete: "CASCADE"
    },
    likes_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    timestamps: true,
    tableName: 'posts'
});

export { Post }