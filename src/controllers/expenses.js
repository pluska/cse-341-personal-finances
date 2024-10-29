const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const COLLECTION_NAME = 'expenses';

const getAll = async (req, res) => {
    //#swagger.tags=['expenses']
    try {
        const list = await mongodb.getDatabase().collection(COLLECTION_NAME).find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const getById = async (req, res) => {
    //#swagger.tags=['expenses']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
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
    //#swagger.tags=['expenses']
    const newExpense = {
        "budget_id": new ObjectId(req.body.budget_id),
        "user_id": new ObjectId(req.body.user_id),
        "amount": req.body.amount,
        "date": new Date(req.body.date),
        "description": req.body.description,
        "category": req.body.category,
    };
    const result = await mongodb.getDatabase().collection(COLLECTION_NAME).insertOne(newExpense);
    if (result.insertedCount === 0) {
        res.status(500).json({ error: 'An error occurred while creating.' });
        return;
    }
    res.status(201).json({ message: 'Created successfully.' });
};

const update = async (req, res) => {
    //#swagger.tags=['expenses']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }
    const id = new ObjectId(req.params.id);
    const updatedExpense = {
        "budget_id": new ObjectId(req.body.budget_id),
        "user_id": new ObjectId(req.body.user_id),
        "amount": req.body.amount,
        "date": new Date(req.body.date),
        "description": req.body.description,
        "category": req.body.category,
    };
    const result = await mongodb.getDatabase().collection(COLLECTION_NAME).replaceOne(
        { _id: id },
        updatedExpense,
    );
    if (result.modifiedCount === 0) {
        res.status(500).json({ error: 'An error occurred while updating.' });
        return;
    }
    res.status(200).json({ message: 'Updated successfully.' });
};

const deleteOne = async (req, res) => {
    //#swagger.tags=['expenses']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }
    const id = req.params.id;
    const result = await mongodb.getDatabase().collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
        res.status(500).json({ error: 'An error occurred while deleting.' });
        return;
    }
    res.status(200).json({ message: 'Deleted successfully' });
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteOne
};