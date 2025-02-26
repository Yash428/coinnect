import {DataTypes} from "sequelize"
import { connectDb } from "../db/index.js"

const sequelize = await connectDb()


const Session = sequelize.define('Session', {
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
    refresh_token: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    tableName:'sessions'
});

export {
    Session
}