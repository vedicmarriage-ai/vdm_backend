const request = require('supertest');
const app = require('../server');

describe('User Model Tests', () => {
    it('should create a new user', async () => {
        const user = { /* user data */ };
        const response = await request(app).post('/api/users').send(user);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('user');
    });
});