const request = require('supertest');
const app = require('../server');

describe('Match Routes Tests', () => {
    it('should get matches for a user', async () => {
        const response = await request(app).get('/api/matches/userId');
        expect(response.statusCode).toBe(200);
    });
});