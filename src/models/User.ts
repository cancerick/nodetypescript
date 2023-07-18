import { Model, Sequelize, DataTypes } from "sequelize";
import databaseConnection from "../db/config";

export default class User extends Model {
    public id!: number;
    public username!: string;
    public password!: string;
}

const userTable = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}

databaseConnection.define('users', userTable, { timestamps: false });
export const UserMap = (sequelize: Sequelize) => {
    User.init(userTable, { sequelize, tableName: 'users', timestamps: false });
}

