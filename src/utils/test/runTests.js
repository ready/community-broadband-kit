import { LOCAL_TESTING_FLAG } from '../constants.js'
import runRst from './rst/test.js'
import runMlabTest from './m-lab/test.js'
import runOoklaTest from './ookla.js'

/**
 * Runs the mlab, speedtest.net and RST speed tests in order
 * @param {*} config An object containing callbacks to handle progress updates during the test
 * @returns An object containing the test results for each test or throws an exception if there is an error running the test
 */
async function runTests(stateSetters, config) {
  try {
    const mlabResults = await runMlabTest(stateSetters, config?.mlab)

    let ooklaResults
    if (LOCAL_TESTING_FLAG) {
      ooklaResults = {latency: 0, jitter: 0, upload: 0, download: 0}
    } else {
      ooklaResults = await runOoklaTest(stateSetters, config?.ooklaComplete)
    }

    const rstResults = await runRst(stateSetters, config?.rst)

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
      ooklaDownload: ooklaResults.download,
    }

    return results

  } catch (error) {
    config?.error?.(error)
    throw error
  }
}

export default runTests