import {DataTypes} from "sequelize"
import { connectDb } from "../db/index.js"

const sequelize = await connectDb()

const Community = sequelize.define("Community", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    created_by: {
        type: DataTypes.INTEGER,
        references: {
            model: "Users",
            key: "id"
        },
        onDelete: "CASCADE"
    }
}, {
    timestamps: true,
    tableName: 'communities'
});

export{
    Community
}