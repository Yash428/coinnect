import {DataTypes} from "sequelize"
import { connectDb } from "../db/index.js"

const sequelize = await connectDb()

const Like = sequelize.define("Like", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "Users",
            key: "id"
        },
        onDelete: "CASCADE"
    },
    post_id: {
        type: DataTypes.INTEGER,
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
    tableName: 'likes',
    timestamps: false,
});

export {
    Like
}