import request from 'supertest';
import 'reflect-metadata';

import app from '../src/app';
import databaseConnection from '../src/db/config';

import User, { UserMap } from '../src/models/User';
let user = {
    username: 'user02',
    password: 'pass02'
};

afterAll(() => {
    UserMap(databaseConnection);
    User.destroy({
        where: { username: user.username }
    });
});

describe('API auth, registro y login', () => {
    test('Registro de un usuario: url /api/auth/register', async () => {
        let result = await request(app)
            .post(`/api/auth/register`)
            .send(user);

        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                username: expect.any(String)
            })
        )
    });

    test('Login de un usuario: url /api/auth/login', async () => {
        let result = await request(app)
            .post(`/api/auth/login`)
            .send(user);

        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                username: expect.any(String)
            })
        )
    });
});
