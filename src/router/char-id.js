const express = require('express');

const router = express.Router();
const methods = require('../middleware/method');
const data = require('../data.json');

router.all('/api/v1/characters/:id', methods([`GET`]), (req, res) => {
    let id = req.params.id;
    let firstsplit = id.toLowerCase()
    let characterName = firstsplit.charAt(0).toUpperCase() + firstsplit.slice(1);
    let character = data.filter(char => char.characters.includes(characterName));
    res.json({
        title: 'Episodes',
        content: character,
    });
});

module.exports = router;