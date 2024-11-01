const request = require('supertest');
const express = require('express');
const usersRoutes = require('../routes/users'); // Assuming you have a users route file
const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const app = express();
app.use(express.json());
app.use('/users', usersRoutes);

jest.mock('../data/database');

describe('Users API Endpoints', () => {
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

    describe('GET /api/users', () => {
        it('should return all users in the database', async () => {
            const users = [
                { 
                    _id: '1', 
                    first_name: 'John',
                    last_name: 'Doe',
                    email: 'john.doe@example.com',
                    password: 'hashedpassword1',
                },
                { 
                    _id: '2', 
                    first_name: 'Jane',
                    last_name: 'Doe',
                    email: 'jane.doe@example.com',
                    password: 'hashedpassword2',
                }
            ];
            mockCollection.find.mockReturnValue({
                toArray: jest.fn().mockResolvedValue(users),
            });
            const response = await request(app).get('/users');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(users);
        });

        it('should handle errors', async () => {
            mockCollection.find.mockReturnValue({
                toArray: jest.fn().mockRejectedValue(new Error('Database error')),
            });
            const response = await request(app).get('/users');
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'An error occurred');
        });
    });

    describe('GET /api/users/:id', () => {
        it('should return one user from the database, by id', async () => {
            const user = 
            { 
                _id: new ObjectId('507f1f77bcf86cd799439011'),
                first_name: 'John',
                last_name: 'Doe',
                email: 'john.doe@example.com',
                password: 'hashedpassword1',
            };
            mockCollection.findOne.mockResolvedValue(user);
            const response = await request(app).get('/users/507f1f77bcf86cd799439011');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                ...user,
                _id: '507f1f77bcf86cd799439011',
            });
        });

        it('should return 404 if the user does not exist', async () => {
            mockCollection.findOne.mockResolvedValue(null);
            const response = await request(app).get('/users/999');
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'Specified id is not valid');
        });
    });
});
