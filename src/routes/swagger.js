const router = require('express').Router();
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('../../swagger.json');

router.use('/api-docs', swaggerUI.serve);
router.get('/api-docs', swaggerUI.setup(swaggerDoc));

module.exports = router;