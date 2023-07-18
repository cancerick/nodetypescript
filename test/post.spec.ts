import request from 'supertest';
import 'reflect-metadata';

import app from '../src/app';
import databaseConnection from '../src/db/config';

import Post, { PostMap } from '../src/models/Post';

let user = {
    username: 'user01',
    password: 'pass01'
};

beforeAll(async () => {
    await request(app)
        .post(`/api/auth/register`)
        .send(user);
});

afterAll(() => {
    PostMap(databaseConnection);
    Post.destroy({
        where: {},
        truncate: true
    });
});

describe('Consumo API post', () => {
    let token = '';
    let data;

    beforeAll(async () => {
        data = await request(app)
            .post(`/api/auth/login`)
            .send(user);
        token = data.body.token;
    });

    test('StatusCode 200 sin datos a la url /api/post', async () => {
        let result = await request(app)
            .get(`/api/post`)
            .set('Authorization', `Bearer ${token}`);

        expect(result.statusCode).toBe(200);
    });

    test('Registrar a la db todos los posts del repositorio https://jsonplaceholder.typicode.com/posts', async () => {
        let result = await request(app)
            .get(`/api/post/register`)
            .set('Authorization', `Bearer ${token}`);

        expect(result.statusCode).toBe(200);
    });

    test('StatusCode 200 datos registrados a la url /api/post', async () => {
        let result = await request(app)
            .get(`/api/post`)
            .set('Authorization', `Bearer ${token}`);

        expect(result.statusCode).toBe(200);
    });

    test('Cantidad de registros mayor a 1, luego de registrar todos los posts', async () => {
        let result = await request(app)
            .get(`/api/post`)
            .set('Authorization', `Bearer ${token}`);

        expect(result.body.length).toBeGreaterThan(1);
    });
})
