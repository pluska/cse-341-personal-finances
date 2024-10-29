const router = require('express').Router();
const incomesController = require('../controllers/incomes');
const validate = require('../middleware/validate');

router.get('/', incomesController.getAll);
router.get('/:id', incomesController.getById);
router.get('/user/:id', incomesController.getAllByUserId);
router.get('/budget/:id', incomesController.getAllByBudgetId);
router.post('/', validate.saveBudget, incomesController.create);
router.put('/:id', validate.saveBudget, incomesController.update);
router.delete('/:id', incomesController.deleteOne);

module.exports = router;