const router = require('express').Router();
const budgetsController = require('../controllers/budgets');
const validate = require('../middleware/validate');

router.get('/', budgetsController.getAll);
router.get('/:id', budgetsController.getById);
router.post('/', validate.saveBudget, budgetsController.create);
router.put('/:id', validate.saveBudget, budgetsController.update);
router.delete('/:id', budgetsController.deleteOne);

module.exports = router;