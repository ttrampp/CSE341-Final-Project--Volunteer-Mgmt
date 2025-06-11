jest.mock('../middleware/authMiddleware', () => ({
  isAuthenticated: (req, res, next) => next()
}));

const app = require('../app')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app)

describe('Test Handlers', () => {
    test('Get all users by /', async () => {
        const res = await request.get('/api/users');
        console.log(res.statusCode);
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })

    test('Get one user by /:id', async () => {
        const input = [
            { id: '6840f2b18388378aedae6664' }, // Valid ID
            { id: 'invalid-id' }, // Invalid ID
            { id: '64f1a6d2b9c3f842d8c45f89' } // Non-existent ID
        ]
        for (const { id } of input) {
            const res = await request.get(`/api/users/${id}`);
            console.log(res.statusCode);
            expect(res.header['content-type']).toBe('application/json; charset=utf-8');
            if (id === '6840f2b18388378aedae6664') {
                expect(res.statusCode).toBe(200);
            } else if (id === 'invalid-id') {
                expect(res.statusCode).toBe(400); 
            } else {
                expect(res.statusCode).toBe(404);
            }
        }
    })
})