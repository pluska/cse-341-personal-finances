const router = require('express').Router();

const usersRouter = require('./users');
const budgetsRouter = require('./budgets');
const movementsRouter = require('./incomes');
const loansRouter = require('./loans');
const expensesRouter = require('./expenses');

router.use('/users', usersRouter);
router.use('/budgets', budgetsRouter);
router.use('/movements', movementsRouter);
router.use('/loans', loansRouter);
router.use('/expenses', expensesRouter);


router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World!');
});



module.exports = router;