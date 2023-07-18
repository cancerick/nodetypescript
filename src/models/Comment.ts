import { Model, Sequelize, DataTypes } from "sequelize";
import databaseConnection from "../db/config";

export default class Comment extends Model {
    public id!: number;
    public postId!: number;
    public name!: string;
    public email!: string;
    public body!: string;
}

const commentTable = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}

databaseConnection.define('comments', commentTable, { timestamps: false });
export const CommentMap = (sequelize: Sequelize) => {
    Comment.init(commentTable, { sequelize, tableName: 'comments', timestamps: false });
}
