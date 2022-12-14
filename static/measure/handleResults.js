'use strict'

import { getUuid } from '/static/utils/cookies.js'
import { BGA_URL } from '/static/utils/constants.js'
import { rollupResults, displayResults } from '/static/utils/resultsUtils.js'
import { uploadSurveyData } from '/static/measure/survey.js'

// Document selectors
const testElement = document.getElementById('test')
const resultsElement = document.getElementById('results')
const endLinks = document.getElementById('end-links')

/**
 * Uploads multitest data results to the database
 * @param {*} results An object containing results from the test
 * @returns An ID associated with the result record in the database
 */
async function uploadData(results) {
  const body = JSON.stringify({
    query: `mutation { addMultitestData(data: {
      userId: "${results.uuid}"
      organizationId: ${organizationId}
      ipAddress: "${results.ipAddress}",
      asn: ${results.asn},
      ispName: "${results.ispName}",
      lat: ${results.lat},
      lon: ${results.lon},
      addressLat: ${results.addressLat},
      addressLon: ${results.addressLon},
      address: "${results.address}",
      browserName: ${results.browserName},
      browserVersion: ${results.browserVersion},
      deviceType: ${results.deviceType},
      deviceVendor: ${results.deviceVendor},
      deviceModel: ${results.deviceModel},
      engineName: ${results.engineName},
      engineVersion: ${results.engineVersion},
      osName: ${results.osName},
      osVersion: ${results.osVersion},
      cpu: ${results.cpu},
      rstLatency: ${results.rstLatency},
      rstJitter: ${results.rstJitter},
      rstUpload: ${results.rstUpload},
      rstDownload: ${results.rstDownload},
      mlabLatency: ${results.mlabLatency},
      mlabJitter: ${results.mlabJitter},
      mlabUpload: ${results.mlabUpload},
      mlabDownload: ${results.mlabDownload},
      ooklaLatency: ${results.ooklaLatency},
      ooklaJitter: ${results.ooklaJitter},
      ooklaUpload: ${results.ooklaUpload},
      ooklaDownload: ${results.ooklaDownload},
      medianLatency: ${results.medianLatency},
      medianJitter: ${results.medianJitter},
      medianUpload: ${results.medianUpload},
      medianDownload: ${results.medianDownload},
      usingEthernet: ${results.usingEthernet},
      closeToRouter: ${results.closeToRouter},
      vpnOff: ${results.vpnOff},
      noInterruptFromOtherDevices: ${results.noInterruptFromOtherDevices},
      noService: ${results.noService}
    }) {
      id
    }}`
  });

  return fetch(BGA_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body
  })
  .then(res => res.json())
  .then (result => {
    // Return the id associated with the result record in the database
    return result.data.addMultitestData.id
  })
  .catch(err => console.error(err))
}

/**
 * Uploads multitest no service data results to the database
 * @param {*} results An object containing results
 * @returns An ID associated with the result record in the database
 */
async function uploadNoServiceData(results) {
  const body = JSON.stringify({
    query: `mutation { addMultitestData(data: {
      userId: "${results.uuid}",
      organizationId: ${organizationId},
      lat: ${results.lat},
      lon: ${results.lon},
      addressLat: ${results.addressLat},
      addressLon: ${results.addressLon},
      address: "${results.address}",
      noService: ${results.noService}
    }) {
      id
    }}`
  });

  return fetch(BGA_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body
  })
  .then(res => res.json())
  .then (result => {
    // Return the id associated with the result record in the database
    return result.data.addMultitestData.id
  })
  .catch(err => console.error(err))
}

/**
 * Handles the test results by uploading metadata, checklist responses, speed test results,
 * survey results to the database, and by displaying the results upon completion of the test
 * @param {*} metadata An object containing metadata
 * @param {*} checklistResponses An object containing answers from the pre-test checklist
 * @param {*} address An object containing address data
 * @param {*} results An object containing speed test results
 */
async function handleResults(metadata, checklistResponses, address, results) {
  let uuid = getUuid()

  const rollup = rollupResults(results)

  const data = {
    uuid: uuid,
    addressLat: address.lat || 37.5630,
    addressLon: address.lon || 122.3255,
    lat: metadata.lat || 37.5630,
    lon: metadata.lon || 122.3255,
    address: address.text,
    ipAddress: metadata.ip,
    ispName: metadata.isp,
    asn: metadata.asn,
    browserName: metadata.browserName ? `"${metadata.browserName}"` : null,
    browserVersion: metadata.browserVersion ? `"${metadata.browserVersion}"` : null,
    deviceType: metadata.deviceType ? `"${metadata.deviceType}"` : null,
    deviceVendor: metadata.deviceVendor ? `"${metadata.deviceVendor}"` : null,
    deviceModel: metadata.deviceModel ? `"${metadata.deviceModel}"` : null,
    engineName: metadata.engineName ? `"${metadata.engineName}"` : null,
    engineVersion: metadata.engineVersion ? `"${metadata.engineVersion}"` : null,
    osName: metadata.osName ? `"${metadata.osName}"` : null,
    osVersion: metadata.osVersion ? `"${metadata.osVersion}"` : null,
    cpu: metadata.cpu ? `"${metadata.cpu}"` : null,
    rstLatency: results.rstLatency,
    rstJitter: results.rstJitter,
    rstUpload: results.rstUpload,
    rstDownload: results.rstDownload,
    mlabLatency: results.mlabLatency,
    mlabJitter: results.mlabJitter,
    mlabUpload: results.mlabUpload,
    mlabDownload: results.mlabDownload,
    ooklaLatency: results.ooklaLatency,
    ooklaJitter: results.ooklaJitter,
    ooklaUpload: results.ooklaUpload,
    ooklaDownload: results.ooklaDownload,
    medianLatency: rollup.latency,
    medianJitter: rollup.jitter,
    medianUpload: rollup.upload,
    medianDownload: rollup.download,
    usingEthernet: checklistResponses.usingEthernet,
    closeToRouter: checklistResponses.closeToRouter,
    vpnOff: checklistResponses.vpnOff,
    noInterruptFromOtherDevices: checklistResponses.noInterruptFromOtherDevices,
    noService: checklistResponses.noService
  }

  await uploadSurveyData(uuid, data.addressLat, data.addressLon, address.text, data.ispName, data.ipAddress)

  const id = await uploadData(data)
  data.resultId = id

  testElement.style.display = 'none'
  resultsElement.style.display = 'flex'
  endLinks.style.display = 'flex'

  await displayResults(data)
}

export {handleResults, uploadNoServiceData}