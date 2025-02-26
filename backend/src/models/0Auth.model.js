import {DataTypes} from "sequelize"
import { connectDb } from "../db/index.js"

const sequelize = await connectDb()

const OAuthAccount = sequelize.define('OAuthAccount', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    provider: {
        type: DataTypes.STRING,
        allowNull: false // Example: 'google'
    },
    provider_user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    access_token: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    tableName: 'oauth_accounts'
});

export {
    OAuthAccount
}