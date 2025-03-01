import {DataTypes} from "sequelize"
import { connectDb } from "../db/index.js"
import { Post } from "./post.model.js"

const sequelize = await connectDb()

const User = sequelize.define('Users',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password_hash: {
        type: DataTypes.TEXT,
        allowNull: true // NULL for Google users
    },
    signup_method: {
        type: DataTypes.ENUM('normal', 'google'),
        allowNull: false
    },
    google_id: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    profile_picture: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "https://res.cloudinary.com/dywlcf7kr/image/upload/v1740761627/default-avatar-icon-of-social-media-user-vector_v4f6r6.jpg"
    },
    coins:{
        type: DataTypes.INTEGER,
        defaultValue: 100
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM("male", "female", "other"),
        allowNull: false
    },
},{
    timestamps:false,
    tableName:'users'
    }
)
User.hasMany(Post, { foreignKey: "user_id" });

export
{ 
    User
}