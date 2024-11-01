const request = require('supertest');
const express = require('express');
const expensesRoutes = require('../routes/expenses'); // Assuming you have an expenses route file
const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const app = express();
app.use(express.json());
app.use('/expenses', expensesRoutes);

jest.mock('../data/database');

describe('Expenses API Endpoints', () => {
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

    describe('GET /api/expenses', () => {
        it('should return all expenses in the database', async () => {
            const expenses = [
                { 
                    _id: '1', 
                    budget_id: 'budget1',
                    user_id: 'user1',
                    amount: 100,
                    date: "2021-02-01T00:00:00.000Z",
                    description: "Expense 1",
                    category: "Category 1",
                },
                { 
                    _id: '2', 
                    budget_id: 'budget2',
                    user_id: 'user2',
                    amount: 200,
                    date: "2021-02-01T00:00:00.000Z",
                    description: "Expense 2",
                    category: "Category 2",
                }
            ];
            mockCollection.find.mockReturnValue({
                toArray: jest.fn().mockResolvedValue(expenses),
            });
            const response = await request(app).get('/expenses');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expenses);
        });

        it('should handle errors', async () => {
            mockCollection.find.mockReturnValue({
                toArray: jest.fn().mockRejectedValue(new Error('Database error')),
            });
            const response = await request(app).get('/expenses');
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'An error occurred');
        });
    });

    describe('GET /api/expenses/:id', () => {
        it('should return one expense from the database, by id', async () => {
            const expense = 
            { 
                _id: new ObjectId('507f1f77bcf86cd799439011'),
                budget_id: 'budget1',
                user_id: 'user1',
                amount: 100,
                date: "2021-02-01T00:00:00.000Z",
                description: "Expense 1",
                category: "Category 1",
            };
            mockCollection.findOne.mockResolvedValue(expense);
            const response = await request(app).get('/expenses/507f1f77bcf86cd799439011');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                ...expense,
                _id: '507f1f77bcf86cd799439011',
            });
        });

        it('should return 404 if the expense does not exist', async () => {
            mockCollection.findOne.mockResolvedValue(null);
            const response = await request(app).get('/expenses/999');
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'Specified id is not valid');
        });
    });
});
