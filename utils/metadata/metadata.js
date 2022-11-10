'use strict'

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
 * @param reader A reader for the city data file
 * @returns The city coordinates associated with the client's ip address
 */
async function getLocation(address, reader) {
  try {
    const response = reader.city(address);

    return {
      lat: response.location.latitude,
      lon: response.location.longitude
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

/**
 * Gets the name of the client's isp 
 * @param {*} address The client's ip address
 * @param reader A reader for the isp data file
 * @returns The name of the client's isp or an empty object if not possible
 */
async function getIspName(address, reader) {
  try {
    const response = reader.isp(address);

    return {
      isp: response.isp,
      asn: response.autonomousSystemNumber
    }
  } catch (error) {
    console.log(error)
    return null
  }
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
