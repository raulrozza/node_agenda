const express = require('express');

const router = express.Router();

// Views
router.get('/', (_, res) => {
    return res.render('index');
});

module.exports = router;
