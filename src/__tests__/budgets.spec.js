const request = require('supertest');
const express = require('express');
const budgetsRoutes = require('../routes/budgets'); // Assuming you have a budgets route file
const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const app = express();
app.use(express.json());
app.use('/budgets', budgetsRoutes);

jest.mock('../data/database');

describe('Budgets API Endpoints', () => {
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

    describe('GET /api/budgets', () => {
        it('should return all budgets in the database', async () => {
            const budgets = [
                { 
                    _id: '1', 
                    user_id: 'user1',
                    name: "Budget 1",
                    description: "Description 1",
                    total_income_planned: 1000,
                    total_expense_planned: 500,
                    actual_income: 900,
                    actual_expense: 450,
                },
                { 
                    _id: '2', 
                    user_id: 'user2',
                    name: "Budget 2",
                    description: "Description 2",
                    total_income_planned: 2000,
                    total_expense_planned: 1500,
                    actual_income: 1800,
                    actual_expense: 1400,
                }
            ];
            mockCollection.find.mockReturnValue({
                toArray: jest.fn().mockResolvedValue(budgets),
            });
            const response = await request(app).get('/budgets');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(budgets);
        });

        it('should handle errors', async () => {
            mockCollection.find.mockReturnValue({
                toArray: jest.fn().mockRejectedValue(new Error('Database error')),
            });
            const response = await request(app).get('/budgets');
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'An error occurred');
        });
    });

    describe('GET /api/budgets/:id', () => {
        it('should return one budget from the database, by id', async () => {
            const budget = 
            { 
                _id: new ObjectId('507f1f77bcf86cd799439011'),
                user_id: 'user1',
                name: "Budget 1",
                description: "Description 1",
                total_income_planned: 1000,
                total_expense_planned: 500,
                actual_income: 900,
                actual_expense: 450,
            };
            mockCollection.findOne.mockResolvedValue(budget);
            const response = await request(app).get('/budgets/507f1f77bcf86cd799439011');
            console.log(response.body)
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                ...budget,
                _id: '507f1f77bcf86cd799439011',
            });
        });

        it('should return 404 if the budget does not exist', async () => {
            mockCollection.findOne.mockResolvedValue(null);
            const response = await request(app).get('/budgets/999');
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'Specified id is not valid');
        });
    });
});