const router = require('express').Router();
const usersController = require('../controllers/users');
const validate = require('../middleware/validate');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);
router.post('/', validate.saveUser, usersController.create);
router.put('/:id', validate.saveUser, usersController.update);
router.delete('/:id', usersController.deleteOne);

module.exports = router;