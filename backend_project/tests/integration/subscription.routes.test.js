const request = require('supertest');
const app = require('../server');

describe('Subscription Routes Tests', () => {
    it('should get subscription plans', async () => {
        const response = await request(app).get('/api/subscriptions');
        expect(response.statusCode).toBe(200);
    });
});