const request = require('supertest');
const express = require('express');
const incomesRoutes = require('../routes/incomes'); // Assuming you have an incomes route file
const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const app = express();
app.use(express.json());
app.use('/incomes', incomesRoutes);

jest.mock('../data/database');

describe('Incomes API Endpoints', () => {
    let mockCollection;

    beforeEach(() => {
        mockCollection = {
            find: jest.fn(),
            findOne: jest.fn(),
            insertOne: jest.fn(),
            replaceOne: jest.fn(),
            deleteOne: jest.fn(),
        };
        mongodb.getDatabase.mockReturnValue({
            collection: jest.fn().mockReturnValue(mockCollection),
        });
    });

    describe('GET /api/incomes', () => {
        it('should return all incomes in the database', async () => {
            const incomes = [
                { 
                    _id: '1', 
                    user_id: 'user1',
                    budget_id: 'budget1',
                    type: 'salary',
                    amount: 1000,
                    date: "2021-02-01T00:00:00.000Z",
                    description: "Income 1",
                },
                { 
                    _id: '2', 
                    user_id: 'user2',
                    budget_id: 'budget2',
                    type: 'freelance',
                    amount: 2000,
                    date: "2021-02-01T00:00:00.000Z",
                    description: "Income 2",
                }
            ];
            mockCollection.find.mockReturnValue({
                toArray: jest.fn().mockResolvedValue(incomes),
            });
            const response = await request(app).get('/incomes');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(incomes);
        });

        it('should handle errors', async () => {
            mockCollection.find.mockReturnValue({
                toArray: jest.fn().mockRejectedValue(new Error('Database error')),
            });
            const response = await request(app).get('/incomes');
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'An error occurred');
        });
    });

    describe('GET /api/incomes/:id', () => {
        it('should return one income from the database, by id', async () => {
            const income = 
            { 
                _id: new ObjectId('507f1f77bcf86cd799439011'),
                user_id: 'user1',
                budget_id: 'budget1',
                type: 'salary',
                amount: 1000,
                date: "2021-02-01T00:00:00.000Z",
                description: "Income 1",
            };
            mockCollection.findOne.mockResolvedValue(income);
            const response = await request(app).get('/incomes/507f1f77bcf86cd799439011');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                ...income,
                _id: '507f1f77bcf86cd799439011',
            });
        });

        it('should return 404 if the income does not exist', async () => {
            mockCollection.findOne.mockResolvedValue(null);
            const response = await request(app).get('/incomes/999');
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'Invalid id');
        });
    });
});
