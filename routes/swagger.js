const router = require('express').Router();
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.get('/swagger.json', (req, res) => {
    res.sendFile(path.join(__dirname, '../swagger.json'));
});

module.exports = router;