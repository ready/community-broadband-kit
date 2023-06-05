import { LOCAL_TESTING_FLAG } from 'utils/constants.js'
import runRst from './rst/test.js'
import runMlabTest from './m-lab/test.js'
import runOoklaTest from './ookla.js'
import runCloudflareTest from './cloudflare/test.js'
import getMedianResults from 'utils/getMedianResults.js'

/**
 * Runs the mlab, speedtest.net and RST speed tests in order
 * @param {*} config An object containing callbacks to handle progress updates during the test
 * @returns An object containing the test results for each test or throws an exception if there is an error running the test
 */

async function uploadResults(results, metadata, callAddMultitestData, resultId) {
  let data = {...results, ...getMedianResults(results)}

  for (const result in data) {
    data[result] = Number(data[result])
  }

  let testData = {...metadata, ...data}
  if (resultId) {
    testData.id = resultId
  }

  try {
    const res = await callAddMultitestData(data)
    data.id = res?.data?.addMultitestData?.id

    return data
  } catch (error) {
    console.log(error)
  }
}

function withTimeout({
  test,
  state,
  promise,
  handler = () => {},
  ms = 300000
}) {
  const timeout = new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId)
      handler(state)
      console.log(test + ' timed out in '+ ms + 'ms.')
      resolve({})
    }, ms)
  })

  return Promise.race([
    promise,
    timeout
  ])
}

/**
 * Runs the mlab, speedtest.net and RST speed tests in order
 * @param {*} config An object containing callbacks to handle progress updates during the test
 * @returns An object containing the test results for each test or throws an exception if there is an error running the test
 */
async function runTests(stateSetters, config, metadata, callAddMultitestData) {
  let results = {}
  let data = {}
  let resultId

  try {
    const mlabResults = await withTimeout({
      test: 'M-Lab',
      stateSetters,
      promise: runMlabTest(stateSetters, config?.mlab),
      handler: config?.mlab?.uploadComplete,
    })

    results.mlabLatency = mlabResults?.latency
    results.mlabJitter = mlabResults?.jitter
    results.mlabUpload = mlabResults?.upload
    results.mlabDownload = mlabResults?.download
  } catch (error) {
    console.log('Error while running M-Lab speed test')
    config?.error?.(error)
    await new Promise(resolve => setTimeout(resolve, 5000))
    config?.mlab?.uploadComplete?.(stateSetters)
  }

  data = await uploadResults(results, metadata, callAddMultitestData, resultId)
  resultId = data.id

  try {
    const cloudflareResults = await withTimeout({
      test: 'Cloudflare',
      stateSetters,
      promise: runCloudflareTest(stateSetters, config?.cloudflareComplete),
      handler: config?.cloudflareComplete,
    })

    results.cloudflareLatency = cloudflareResults?.latency
    results.cloudflareJitter = cloudflareResults?.jitter
    results.cloudflareUpload = cloudflareResults?.upload
    results.cloudflareDownload = cloudflareResults?.download
  } catch (error) {
    console.log('Error while running Cloudflare speed test')
    config?.error?.(error)
    await new Promise(resolve => setTimeout(resolve, 5000))
    config?.cloudflareComplete?.(stateSetters)
  }

  data = await uploadResults(results, metadata, callAddMultitestData, resultId)
  resultId = data.id

  try {
    let ooklaResults = {}
    if (!LOCAL_TESTING_FLAG) {
      ooklaResults = await withTimeout({
        test: 'Ookla',
        stateSetters,
        promise: runOoklaTest(stateSetters, config?.ooklaComplete),
        handler: config?.ooklaComplete
      })
    }

    results.ooklaLatency = ooklaResults?.latency
    results.ooklaJitter = ooklaResults?.jitter
    results.ooklaUpload = ooklaResults?.upload
    results.ooklaDownload = ooklaResults?.download
  } catch (error) { 
    console.log('Error while running Speedtest.net')
    config?.error?.(error)
    await new Promise(resolve => setTimeout(resolve, 5000))
    config?.ooklaComplete?.(stateSetters)
  }

  data = await uploadResults(results, metadata, callAddMultitestData, resultId)
  resultId = data.id

  try {
    const rstResults = await withTimeout({
      test: 'RST',
      stateSetters,
      promise: runRst(stateSetters, config?.rst),
    })

    results.rstLatency = rstResults?.latency
    results.rstJitter = rstResults?.jitter
    results.rstUpload = rstResults?.upload
    results.rstDownload = rstResults?.download
  } catch (error) {
    console.log('Error while running Ready Strength Test')
    config?.error?.(error)
  }

  data = await uploadResults(results, metadata, callAddMultitestData, resultId)

  /*
  Object
    .keys(data)
    .filter(key => data[key] === undefined)
    .forEach(key => delete data[key])
  */

  return data
}

export default runTests