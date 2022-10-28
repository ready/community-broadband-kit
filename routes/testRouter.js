const express = require('express');
const router = express.Router();
const getAssets = require('../utils/getAssets')
const testTemplate = require('../templates/testTemplate')

/**
 * Send the configured test when a GET request is made.
 */
router.get('/test', async function (req, res, next) {
    const host = req.get('host')
    let config = await getAssets(host)
    if (!config) {
        config = await getAssets()
    }

    const testHTML = testTemplate(config)

    res.send(testHTML);
})

module.exports = router;