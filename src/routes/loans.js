const router = require('express').Router();
const loansController = require('../controllers/loans');
const validate = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', loansController.getAll);
router.get('/user/:user_id', loansController.getAllByUserId);
router.get('/:id', loansController.getById);
router.post('/', isAuthenticated, validate.saveBudget, loansController.create);
router.put('/:id', isAuthenticated, validate.saveBudget, loansController.update);
router.delete('/:id', isAuthenticated, loansController.deleteOne);

module.exports = router;