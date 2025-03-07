import {DataTypes} from "sequelize"
import { connectDb } from "../db/index.js"

const sequelize = await connectDb()

const Comment = sequelize.define("Comment", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Users",
            key: "id"
        },
        onDelete: "CASCADE"
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Posts",
            key: "id"
        },
        onDelete: "CASCADE"
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'comments',
    timestamps: false
});

export {
    Comment
}