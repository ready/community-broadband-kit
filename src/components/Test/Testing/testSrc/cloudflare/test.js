
'use strict'

import SpeedTest from '@cloudflare/speedtest';

/**
 * Converts bps to Mbps
 * @param {*} bps 
 * @returns 
 */
function bpsToMbps(bps) {
  return (bps / 1000000).toFixed(2)
}

/**
 * Runs the Cloudflare speed test
 * @param {*} handlerConfig callback which runs when the cloudflare test is complete
 * @returns The results of the Cloudflare test
 */
async function runCloudflareTest(state, completeHandler) {
  
  // Init the cloudflare speed test
  const cloudflare = new SpeedTest()

  // Return the results of the test upon completion
  return new Promise((resolve) => {
    cloudflare.onFinish = (results) => {
      const cloudflareResults = {
        download: bpsToMbps(results.getDownloadBandwidth()),
        upload: bpsToMbps(results.getUploadBandwidth()),
        latency: results.getUnloadedLatency().toFixed(2),
        jitter: results.getUnloadedJitter().toFixed(2)
      }
      completeHandler(state, cloudflareResults.download, cloudflareResults.upload, cloudflareResults.latency, cloudflareResults.jitter)
      resolve(cloudflareResults)
    } 
  })
}

export default runCloudflareTest