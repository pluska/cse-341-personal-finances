const router = require('express').Router();
const expensesController = require('../controllers/expenses');
const validate = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', expensesController.getAll);
router.get('/:id', expensesController.getById);
router.post('/', isAuthenticated, validate.saveBudget, expensesController.create);
router.put('/:id', isAuthenticated, validate.saveBudget, expensesController.update);
router.delete('/:id', isAuthenticated, expensesController.deleteOne);

module.exports = router;