const router = require('express').Router();

const usersRouter = require('./users');
const budgetsRouter = require('./budgets');

router.use('/users', usersRouter);
router.use('/budgets', budgetsRouter);

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World!');
});



module.exports = router;