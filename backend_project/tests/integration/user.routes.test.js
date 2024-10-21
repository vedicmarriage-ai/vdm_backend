const request = require('supertest');
const app = require('../server');

describe('User Routes Tests', () => {
    it('should register a new user', async () => {
        const user = { /* user registration data */ };
        const response = await request(app).post('/api/users/register').send(user);
        expect(response.statusCode).toBe(201);
    });
});