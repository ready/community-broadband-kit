const express = require('express')
const router = express.Router()
const metadataUtil = require('../utils/metadata/metadata')

/**
 * Send the client's ip address, isp name, location,
 * and user agent info when a GET request is made.
 */
router.get('/metadata', async function (req, res, next) {
    const address = metadataUtil.getIpAddress(req)
    
    outgoing = {
        ip: address,
        isp: await metadataUtil.getIspName(address),
        loc: await metadataUtil.getLocation(address),
        ua: metadataUtil.getUaInfo(req)
    };

    res.send(outgoing);
})

module.exports = router;