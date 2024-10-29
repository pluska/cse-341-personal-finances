const validator = require('../helpers/validator');

const saveUser = (req, res, next) => {
    const validationRules = {
        first_name: 'required|string',
        last_name: 'required|string',
        email: 'required|email',
        password: 'required|string'
    }

    validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

const saveBudget = (req, res, next) => {
    const validationRules = {
        user_id: 'required|string',
        name: 'required|string',
        description: 'string',
        total_income_planned: 'required|numeric',
        total_expense_planned: 'required|numeric',
        actual_income: 'numeric',
        actual_expense: 'numeric'
    }

    validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

const saveExpense = (req, res, next) => {
    const validationRules = {
        user_id: 'required|string',
        amount: 'required|numeric',
        date: 'required|string',
        time: 'required|string',
        description: 'string',
        expense_type_url: 'required|string',
    }

    validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

const saveIncomeSource = (req, res, next) => {
    const validationRules = {
        user_id: 'required|string',
        name: 'required|string',
        parent_id: 'string',
    }

    validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

const saveLoanSource = (req, res, next) => {
    const validationRules = {
        user_id: 'required|string',
        name: 'required|string',
        parent_id: 'string',
    }

    validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

const saveLoan = (req, res, next) => {
    const validationRules = {
        user_id: 'required|string',
        loan_source_id: 'required|string',
        amount: 'required|numeric',
        loan_date: 'required|string',
        due_date: 'required|string',
        description: 'string',
    }

    validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

const saveMovement = (req, res, next) => {
    const validationRules = {
        user_id: 'required|string',
        budget_id: 'required|string',
        type: 'required|string',
        amount: 'required|numeric',
        date: 'required|string',
        description: 'string',
    }

    validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}



module.exports = {
    saveUser,
    saveBudget,
    saveExpense,
    saveIncomeSource,
    saveLoanSource,
    saveLoan,
    saveMovement
}