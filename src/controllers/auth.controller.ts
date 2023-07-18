import { Request, Response } from 'express';
import 'reflect-metadata';
import jwt from 'jsonwebtoken';

import crypto from 'crypto';

import dotenv from 'dotenv';
dotenv.config();

import User, { UserMap } from '../models/User';
import databaseConnection from '../db/config';

let API_SECRET_TOKEN = process.env.API_SECRET_TOKEN || 'generarTokenSecreto';

export const register = async (req: Request, res: Response) => {
    if(req.body.username == '')
        res.status(400).json({ message: 'username requerido' });
    if(req.body.password == '')
        res.status(400).json({ message: 'password requerido' });

    let passEncrypted = crypto.createHash('md5').update(req.body.password).digest('hex');

    UserMap(databaseConnection);
    let [user, created] = await User.findOrCreate({
        where: {
            username: req.body.username,
            password: passEncrypted
        }
    });

    res.status(200).json({
        id: user.id,
        username: user.username
    });
};

export const login = async (req: Request, res: Response) => {
    if(req.body.username === undefined)
        return res.status(400).json({ message: 'username requerido' });
    if(req.body.password === undefined)
        return res.status(400).json({ message: 'password requerido' });

    UserMap(databaseConnection);

    const userFinded = await User.findOne({ where: { username: req.body.username } });
    if(!userFinded) return res.status(400).json({ message: 'username o password incorrecto.' });

    let passEncrypted = crypto.createHash('md5').update(req.body.password).digest('hex');
    if(passEncrypted != userFinded.password) return res.status(401).json({ message: 'no autorizado.' });

    const token: string = jwt.sign({ _id: userFinded.id }, API_SECRET_TOKEN);

    res.json({
        id: userFinded.id,
        username: userFinded.username,
        token: token
    });
};
