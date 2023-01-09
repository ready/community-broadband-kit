const express = require('express');
const router = express.Router();
const getAssets = require('../utils/getAssets')
const surveyTemplate = require('../templates/surveyTemplate')

/**
 * Send the survey route when a GET request is made.
 */
router.get('/survey', async function (req, res, next) {
    const host = req.get('host')
    let config = await getAssets(host)
    if (!config) {
        config = await getAssets()
    }

    const surveyHTML = surveyTemplate(config)

    res.send(surveyHTML);
})

module.exports = router;