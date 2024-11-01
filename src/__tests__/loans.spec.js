const request = require('supertest');
const express = require('express');
const loansRoutes = require('../routes/loans'); // Assuming you have a loans route file
const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const app = express();
app.use(express.json());
app.use('/loans', loansRoutes);

jest.mock('../data/database');

describe('Loans API Endpoints', () => {
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

    describe('GET /api/loans', () => {
        it('should return all loans in the database', async () => {
            const loans = [
                { 
                    _id: '1', 
                    user_id: 'user1',
                    amount: 1000,
                    loan_date: "2021-02-01T00:00:00.000Z",
                    due_date: "2021-02-01T00:00:00.000Z",
                    description: "Loan 1",
                },
                { 
                    _id: '2', 
                    user_id: 'user2',
                    amount: 2000,
                    loan_date: "2021-02-01T00:00:00.000Z",
                    due_date: "2021-06-01T00:00:00.000Z",
                    description: "Loan 2",
                }
            ];
            mockCollection.find.mockReturnValue({
                toArray: jest.fn().mockResolvedValue(loans),
            });
            const response = await request(app).get('/loans');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(loans);
        });

        it('should handle errors', async () => {
            mockCollection.find.mockReturnValue({
                toArray: jest.fn().mockRejectedValue(new Error('Database error')),
            });
            const response = await request(app).get('/loans');
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'An error occurred');
        });
    });

    describe('GET /api/loans/:id', () => {
        it('should return one loan from the database, by id', async () => {
            const loan = 
            { 
                _id: new ObjectId('507f1f77bcf86cd799439011'),
                user_id: 'user1',
                amount: 1000,
                loan_date: "2021-02-01T00:00:00.000Z",
                due_date: "2021-02-01T00:00:00.000Z",
                description: "Loan 1",
            };
            mockCollection.findOne.mockResolvedValue(loan);
            const response = await request(app).get('/loans/507f1f77bcf86cd799439011');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                ...loan,
                _id: '507f1f77bcf86cd799439011',
            });
        });

        it('should return 404 if the loan does not exist', async () => {
            mockCollection.findOne.mockResolvedValue(null);
            const response = await request(app).get('/loans/999');
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'Specified id is not valid');
        });
    });
});
