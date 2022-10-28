const express = require('express');
const router = express.Router();
const getAssets = require('../utils/getAssets')
const historyTemplate = require('../templates/historyTemplate')

/**
 * Send the client's history when a GET request is made.
 */
router.get('/history', async function (req, res, next) {
    const host = req.get('host')
    let config = await getAssets(host)
    if (!config) {
        config = await getAssets()
    }

    const historyHTML = historyTemplate(config)

    res.send(historyHTML);
})

module.exports = router;