const app = require('../app')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const mongoose = require('mongoose');
const request = supertest(app)

describe('Test Handlers', () => {

    beforeAll(async () => {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        }
    });

    afterAll(async () => {
        console.log('Closing database connection');
        await mongoose.connection.close();
    });

    test('Get all events by /', async () => {
        const res = await request.get('/api/events');
        console.log(res.statusCode);
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })

    test('Get one event by /:id', async () => {
        const input = [
            { id: '6840fb55191271d6f6f98fee' }, // Valid ID
            { id: 'invalid-id' }, // Invalid ID
            { id: '64f1a6d2b9c3f842d8c45f89' } // Non-existent ID
        ]
        for (const { id } of input) {
            const res = await request.get(`/api/events/${id}`);
            console.log(res.statusCode);
            expect(res.header['content-type']).toBe('application/json; charset=utf-8');
            if (id === '6840fb55191271d6f6f98fee') {
                expect(res.statusCode).toBe(200);
            } else if (id === 'invalid-id') {
                expect(res.statusCode).toBe(400); 
            } else {
                expect(res.statusCode).toBe(404);
            }
        }
    })
})