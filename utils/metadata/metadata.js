'use strict'

const Reader = require('@maxmind/geoip2-node').Reader;
const parser = require('ua-parser-js');

/**
 * Gets the client's ip address from the request object
 * @param {*} req A request from the client
 * @returns The the ip address of the client
 */
function getIpAddress(req) {
    if (req.headers['x-forwarded-for']) {
        return req.headers['x-forwarded-for'].split(',')[0].trim();
    } else {
        return req.connection.remoteAddress;
    }
}

/**
 * Gets the coordinates of the client's city
 * @param {*} address The client's ip address
 * @returns The city coordinates associated with the client's ip address
 */
async function getLocation(address) {
    return Reader.open('./data/city/GeoIP2-City.mmdb')
        .then(reader => {
            const response = reader.city(address);

            return {
                lat: response.location.latitude,
                lon: response.location.longitude
            }
        })
        .catch((error) => {
            return null
        })
}

/**
 * Gets the name of the client's isp 
 * @param {*} address The client's ip address
 * @returns The name of the client's isp or an empty object if not possible
 */
async function getIspName(address) {
    // Uncomment harde coded ip if testing isp name locally
    // address = '76.126.59.75'
    return Reader.open('./data/isp/GeoIP2-ISP.mmdb')
        .then(reader => {
            const response = reader.isp(address);

            return {
                isp: response.isp,
                asn: response.autonomousSystemNumber
            }
        })
        .catch((error) => {
            return null
        })
}

/**
 * Gets the client's user agent information
 * @param {*} req A request from the client
 * @returns An object containg the user agent information about the client
 */
function getUaInfo(req) {
    return parser(req.headers['user-agent']);
}

module.exports.getIpAddress = getIpAddress;
module.exports.getLocation = getLocation;
module.exports.getIspName = getIspName;
module.exports.getUaInfo = getUaInfo;
