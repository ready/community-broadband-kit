const express = require('express');
const router = express.Router();
const getAssets = require('../utils/getAssets')
const resultsTemplate = require('../templates/resultsTemplate')

/**
 * Send the client's result when a GET request is made.
 */
router.get('/results/:id', async function (req, res, next) {
    const host = req.get('host')
    let config = await getAssets(host)
    if (!config) {
        config = await getAssets()
    }

    const resultsHTML = await resultsTemplate(req.params.id, config)

    res.send(resultsHTML);
})

module.exports = router;