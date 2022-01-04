const express = require('express');

const router = express.Router();
const methods = require('../middleware/method');
const data = require('../data.json');

router.all('/api/v1/episodes', methods([`GET`]), (req, res) => {
    res.json({
        title: 'Episodes',
        content: data,
    });
});

module.exports = router;