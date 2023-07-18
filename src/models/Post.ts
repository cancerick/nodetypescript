import { Model, Sequelize, DataTypes } from "sequelize";
import databaseConnection from "../db/config";

export default class Post extends Model {
    public id!: number;
    public userId!: number;
    public title!: string;
    public body!: string;
}

const postTable = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}

databaseConnection.define('posts', postTable, { timestamps: false });
export const PostMap = (sequelize: Sequelize) => {
    Post.init(postTable, { sequelize, tableName: 'posts', timestamps: false });
}
