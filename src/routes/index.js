const router = require('express').Router();
const passport = require('passport');

const usersRouter = require('./users');
const budgetsRouter = require('./budgets');
const incomesRouter = require('./incomes');
const loansRouter = require('./loans');
const expensesRouter = require('./expenses');

router.use('/users', usersRouter);
router.use('/budgets', budgetsRouter);
router.use('/incomes', incomesRouter);
router.use('/loans', loansRouter);
router.use('/expenses', expensesRouter);

router.get('/login', passport.authenticate('github'), (req, res) => {
    //#swagger.tags=['Authentication']
});

router.get('/logout', (req, res, next) => {
    //#swagger.tags=['Authentication']
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
);

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World!');
});



module.exports = router;