const router = require('express').Router();
const budgetsController = require('../controllers/budgets');
const validate = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', budgetsController.getAll);
router.get('/user/:user_id', budgetsController.getAllByUserId);
router.get('/:id', budgetsController.getById);
router.post('/', isAuthenticated, validate.saveBudget, budgetsController.create);
router.put('/:id', isAuthenticated, validate.saveBudget, budgetsController.update);
router.delete('/:id', isAuthenticated, budgetsController.deleteOne);

module.exports = router;