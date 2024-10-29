const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const COLLECTION_NAME = 'incomes';

const getAll = async (req, res) => {
    //#swagger.tags=['incomes']
    try {
        const list = await mongodb.getDatabase().collection(COLLECTION_NAME).find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const getAllByUserId = async (req, res) => {
    //#swagger.tags=['incomes']
    try {
        const list = await mongodb
            .getDatabase()
            .collection(COLLECTION_NAME)
            .find({ user_id: new ObjectId(req.params.user_id) })
            .toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const getAllByBudgetId = async (req, res) => {
    //#swagger.tags=['incomes']
    try {
        const list = await mongodb
            .getDatabase()
            .collection(COLLECTION_NAME)
            .find({ budget_id: new ObjectId(req.params.budget_id) })
            .toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const getById = async (req, res) => {
    //#swagger.tags=['incomes']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Invalid id' });
        return;
    }
    const id = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDatabase().collection(COLLECTION_NAME).findOne({ _id: id });
        if (!result) {
            res.status(404).json({ message: 'Not found' });
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const create = async (req, res) => {
    //#swagger.tags=['incomes']
    const newIncome = {
        user_id: new ObjectId(req.body.user_id),
        budget_id: new ObjectId(req.body.budget_id),
        type: req.body.type,
        amount: req.body.amount,
        date: new Date(req.body.date),
        description: req.body.note || null,
    };
    try {
        const result = await mongodb.getDatabase().collection(COLLECTION_NAME).insertOne(newIncome);
        if (result.insertedCount === 0) {
            res.status(500).json({ error: 'Error creating income.' });
            return;
        }
        res.status(201).json({ message: 'Income created successfully.' });
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const update = async (req, res) => {
    //#swagger.tags=['incomes']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Invalid id' });
        return;
    }
    const id = new ObjectId(req.params.id);
    const updatedIncome = {
        user_id: new ObjectId(req.body.user_id),
        budget_id: new ObjectId(req.body.budget_id),
        type: req.body.type,
        amount: req.body.amount,
        date: new Date(req.body.date),
        description: req.body.note || null,
    };
    try {
        const result = await mongodb.getDatabase().collection(COLLECTION_NAME).replaceOne({ _id: id }, updatedIncome);
        if (result.modifiedCount === 0) {
            res.status(500).json({ error: 'Error updating income.' });
            return;
        }
        res.status(200).json({ message: 'Income updated successfully.' });
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const deleteOne = async (req, res) => {
    //#swagger.tags=['incomes']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Invalid id' });
        return;
    }
    const id = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDatabase().collection(COLLECTION_NAME).deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            res.status(500).json({ error: 'Error deleting income.' });
            return;
        }
        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

module.exports = {
    getAll,
    getById,
    getAllByUserId,
    getAllByBudgetId,
    create,
    update,
    deleteOne
};
