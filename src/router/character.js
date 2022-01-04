const express = require('express');

const router = express.Router();
const methods = require('../middleware/method');
const data = require('../data.json');

router.all('/api/v1/characters', methods([`GET`]), (req, res) => {
    let characters = data.map(item => item.characters);
    let merged = [].concat.apply([], characters);
    let unique = [...new Set(merged)]
    console.log(unique);
    res.json({
        title: 'Episodes',
        content: unique,
    });
});

module.exports = router;