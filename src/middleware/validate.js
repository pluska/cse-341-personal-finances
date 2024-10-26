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



module.exports = {
    saveUser,
    saveBudget
}