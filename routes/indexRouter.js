const express = require('express');
const router = express.Router();
const getAssets = require('../utils/getAssets')
const indexTemplate = require('../templates/indexTemplate')

/**
 * Send the client's config/assets when a GET request is made.
 */
router.get('/', async function (req, res, next) {
    const host = req.get('host')
    let config = await getAssets(host)
    if (!config) {
        config = await getAssets()
    }

    const testHTML = indexTemplate(config)

    res.send(testHTML);
})

module.exports = router;