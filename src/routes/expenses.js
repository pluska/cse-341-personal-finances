const router = require('express').Router();
const expensesController = require('../controllers/expenses');
const validate = require('../middleware/validate');

router.get('/', expensesController.getAll);
router.get('/:id', expensesController.getById);
router.post('/', validate.saveBudget, expensesController.create);
router.put('/:id', validate.saveBudget, expensesController.update);
router.delete('/:id', expensesController.deleteOne);

module.exports = router;