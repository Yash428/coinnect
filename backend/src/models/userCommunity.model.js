import {DataTypes} from "sequelize"
import { connectDb } from "../db/index.js"

const sequelize = await connectDb()

const UserCommunity = sequelize.define("UserCommunity", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      community_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Community",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      joined_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      user_role: {
        type: DataTypes.ENUM("member", "moderator", "admin"),
        allowNull: false,
        defaultValue: "member",
      },
},{
    tableName: "user_communities",
    timestamps: false,
})

export {
    UserCommunity
}