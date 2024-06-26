'use strict'

import { LOCAL_TESTING_FLAG } from '/static/utils/constants.js'
import runRst from '/static/test/rst/test.js'
import runMlabTest from '/static/test/m-lab/test.js'
import runOoklaTest from '/static/test/ookla.js'

/**
 * Runs the mlab, speedtest.net and RST speed tests in order
 * @param {*} config An object containing callbacks to handle progress updates during the test
 * @returns An object containing the test results for each test or throws an exception if there is an error running the test
 */
async function runTests(config) {
  try {
    const mlabResults = await runMlabTest(config?.mlab)

    let ooklaResults
    if (LOCAL_TESTING_FLAG) {
      ooklaResults = {latency: 0, jitter: 0, upload: 0, download: 0}
    } else {
      ooklaResults = await runOoklaTest(config?.ooklaComplete)
    }

    const rstResults = await runRst(config?.rst)

    const results = {
      rstLatency: rstResults.latency,
      rstJitter: rstResults.jitter,
      rstUpload: rstResults.upload,
      rstDownload: rstResults.download,
      mlabLatency: mlabResults.latency,
      mlabJitter: mlabResults.jitter,
      mlabUpload: mlabResults.upload,
      mlabDownload: mlabResults.download,
      ooklaLatency: ooklaResults.latency,
      ooklaJitter: ooklaResults.jitter,
      ooklaUpload: ooklaResults.upload,
      ooklaDownload: ooklaResults.download
    }

    return results

  } catch (error) {
    config?.error?.(error)
    throw error
  }
}

export default runTests