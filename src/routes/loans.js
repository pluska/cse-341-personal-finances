const router = require('express').Router();
const loansController = require('../controllers/loans');
const validate = require('../middleware/validate');

router.get('/', loansController.getAll);
router.get('/user/:id', loansController.getAllByUserId);
router.get('/:id', loansController.getById);
router.post('/', validate.saveBudget, loansController.create);
router.put('/:id', validate.saveBudget, loansController.update);
router.delete('/:id', loansController.deleteOne);

module.exports = router;