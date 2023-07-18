import request from 'supertest';
import 'reflect-metadata';

import app from '../src/app';
import databaseConnection from '../src/db/config';

import Comment, { CommentMap } from '../src/models/Comment';

let user = {
    username: 'user01',
    password: 'pass01'
};

beforeAll(async () => {
    await request(app)
        .post(`/api/auth/register`)
        .send(user);
}, 30000);

afterAll(() => {
    CommentMap(databaseConnection);
    Comment.destroy({
        where: {},
        truncate: true
    });
});

describe('Consumo API comment', () => {
    let token = '';
    let data;

    beforeAll(async () => {
        data = await request(app)
            .post(`/api/auth/login`)
            .send(user);
        token = data.body.token;
    }, 30000);

    test('StatusCode 200 sin datos a la url /api/comment', async () => {
        let result = await request(app)
            .get(`/api/comment`)
            .set('Authorization', `Bearer ${token}`);

        expect(result.statusCode).toBe(200);
    });

    test('Registrar a la db todos los comments del repositorio https://jsonplaceholder.typicode.com/comments', async () => {
        let result = await request(app)
            .get(`/api/comment/register`)
            .set('Authorization', `Bearer ${token}`);

        expect(result.statusCode).toBe(200);
    });

    test('StatusCode 200 datos registrados a la url /api/comment', async () => {
        let result = await request(app)
            .get(`/api/comment`)
            .set('Authorization', `Bearer ${token}`);

        expect(result.statusCode).toBe(200);
    });

    test('Cantidad de registros mayor a 1, luego de registrar todos los comments', async () => {
        let result = await request(app)
            .get(`/api/comment`)
            .set('Authorization', `Bearer ${token}`);

        expect(result.body.length).toBeGreaterThan(1);
    });
})
