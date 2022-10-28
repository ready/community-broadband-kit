const { getResultsFields } = require('../utils/resultsUtils')
const express = require('express');
const router = express.Router();

/**
 * Send the client's result fields when a GET request is made.
 */
 router.post('/getResultsFields', async function (req, res, next) {
    const fields = getResultsFields(req.body.results)

    res.send(fields);
})

module.exports = router;