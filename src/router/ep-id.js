const express = require('express');

const router = express.Router();
const methods = require('../middleware/method');
const data = require('../data.json');

router.all('/api/v1/episodes/:id', methods([`GET`]), (req, res) => {
    const id = req.params.id;
    const episode = data.find(item => item.id == id);
    if (episode) {
        res.status(200).json(episode);
    } else {
        res.status(404).json({
            message: 'Episode not found',
        });
    }
});

module.exports = router;