const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const COLLECTION_NAME = 'budgets';

const getAll = async (req, res) => {
    //#swagger.tags=['budgets']
    try {
        const list = await mongodb.getDatabase().collection(`${COLLECTION_NAME}`).find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list);
    } catch (err) {
        res.status(400).json({ message: 'An error occurred' });
    }
};

const getAllByUserId = async (req, res) => {
    //#swagger.tags=['budgets']
    try {
        const list = await mongodb
            .getDatabase()
            .collection(`${COLLECTION_NAME}`)
            .find({ user_id: new ObjectId(req.params.user_id) })
            .toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const getById = async (req, res) => {
    //#swagger.tags=['budgets']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }
    const id = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDatabase().collection(`${COLLECTION_NAME}`).findOne({ _id: id });
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
    //#swagger.tags=['budgets']
    const newBudget = {
        "user_id": new ObjectId(req.body.user_id),
        "name": req.body.name,
        "description": req.body.description,
        "total_income_planned": req.body.total_income_planned,
        "total_expense_planned": req.body.total_expense_planned,
        "actual_income": req.body.actual_income,
        "actual_expense": req.body.actual_expense,
        };
    const result = await mongodb.getDatabase().collection(`${COLLECTION_NAME}`).insertOne(newBudget);
    if (result.insertedCount === 0) {
        res.status(500).json({ error: 'An error occurred while creating.' });
        return;
    }
    res.status(201).json({ message: 'Created successfully.' });
};

const update = async (req, res) => {
    //#swagger.tags=['budgets']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }
    const id = new ObjectId(req.params.id);
    const updateBudget = {
        "user_id": new ObjectId(req.body.user_id),
        "name": req.body.name,
        "description": req.body.description,
        "total_income_planned": req.body.total_income_planned,
        "total_expense_planned": req.body.total_expense_planned,
        "actual_income": req.body.actual_income,
        "actual_expense": req.body.actual_expense,
        };
    const result = await mongodb.getDatabase().collection(`${COLLECTION_NAME}`).replaceOne(
        { _id: id },
        updateBudget,
    );
    if (result.modifiedCount === 0) {
        res.status(500).json({ error: 'An error occurred while updating.' });
        return;
    }
    res.status(200).json({ message: 'Updated successfully.' });
};

const deleteOne = async (req, res) => {
    //#swagger.tags=['budgets']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }
    const id = req.params.id;
    const result = await mongodb.getDatabase().collection(`${COLLECTION_NAME}`).deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
        res.status(500).json({ error: 'An error occurred while deleting.' });
        return;
    }
    res.status(200).json({ message: 'Deleted successfully' });
};

module.exports = {
    getAll,
    getAllByUserId,
    getById,
    create,
    update,
    deleteOne
};