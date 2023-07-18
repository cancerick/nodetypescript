import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";

import dotenv from 'dotenv';
dotenv.config();

let API_SECRET_TOKEN = process.env.API_SECRET_TOKEN || 'generarTokenSecreto';

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // validar que existe un authorization Bearer en el header
        if (!req.headers.authorization) {
            return res.status(401).send({ message: 'Acceso denegado' });
        }

        // Obtener y validar que el Bearer tenga valor
        const token = req.headers.authorization.split(" ")[1];
        if (!token) return res.status(401).send({ message: 'Acceso denegado' });

        // Verificar el token
        await jwt.verify(token, API_SECRET_TOKEN);
        next();
    } catch (error) {
        console.error(`Error validateToken: ${error}`);
        if(error instanceof TokenExpiredError) {
            return res.status(401).send({ status: "error", message: "Token expirado." });
        }
        return res.status(500).send({ status: "error", message: "Error al validar token." });
    }
}