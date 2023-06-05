import { LOCAL_TESTING_FLAG } from 'utils/constants'

// Document selectors

/**
 * Callback to handle M-lab download throughput measurements
 * @param {*} download M-lab download throughput measurement in Mbps
 */
const mlabDownloadProgress = (stateSetters, download) => {
  stateSetters.setTestProgress(download)
}

/**
 * Callback to handle M-lab download final results
 * @param {*} download M-lab final download throughput result
 */
const mlabDownloadComplete = (stateSetters, download) => {
  stateSetters.setTestType('Uploading')
}

/**
 * Callback to handle M-lab upload throughput measurements
 * @param {*} upload M-lab upload throughput measurement in Mbps
 */
const mlabUploadProgress = (stateSetters, upload) => {
  stateSetters.setTestProgress(upload)
}

/**
 * Callback to handle M-lab upload final results
 * @param {*} upload M-lab final upload throughput result
 * @param {*} latency M-lab final upload latency result
 * @param {*} jitter M-lab final upload jitter result
 */
const mlabUploadComplete = (stateSetters, upload, latency, jitter) => {
  stateSetters.setTestProgress('')
  stateSetters.setTestSource('Cloudflare')
}

/**
 * Displays Speedtest.net upon completion of the Cloudflare test
 * @param {*} download 
 * @param {*} upload 
 * @param {*} latency 
 * @param {*} jitter 
 */
const cloudflareComplete = (stateSetters, upload, latency, jitter) => {
  if (!LOCAL_TESTING_FLAG) {
    stateSetters.setTestSource('Speedtest.net')
  } else {
    stateSetters.setTestSource('RST')
    stateSetters.setTestType('Connecting')
  }
}

/**
 * Displays RST upon completion of the Speedtest.net test
 * @param {*} download 
 * @param {*} upload 
 * @param {*} latency 
 * @param {*} jitter 
 */
const ooklaComplete = (stateSetters, download, upload, latency, jitter) => {
  stateSetters.setTestSource('RST')
  stateSetters.setTestType('Connecting')
}

/**
 * Updates the RST test progress element with live ping result
 * @param {*} latency RST ping progress update
 * @param {*} jitter RST ping progress update
 */
const rstPingProgress = (stateSetters, latency, jitter) => {
  stateSetters.setTestProgress(latency)
}

/**
 * Updates the RST test progress element with live download result
 * @param {*} download RST download progress update
 */
const rstDownloadProgress = (stateSetters, download) => {
  stateSetters.setTestProgress(download)
}

/**
 * Updates the RST test progress element with live upload result
 * @param {*} download RST upload progress update
 */
const rstUploadProgress = (stateSetters, upload) => {
 stateSetters.setTestProgress(upload)
}

/**
 * Callback to handle any errors that occur during the test
 * @param {*} error The error message
 */
const error = (error) => {
  console.log(error)
}

// Config containing callbacks to handle progress updates during the test
const config = {
  mlab: {
    downloadProgress: mlabDownloadProgress,
    downloadComplete: mlabDownloadComplete,
    uploadProgress: mlabUploadProgress,
    uploadComplete: mlabUploadComplete
  },
  cloudflareComplete,
  ooklaComplete,
  rst: {
    pingProgress: rstPingProgress,
    downloadProgress: rstDownloadProgress,
    uploadProgress: rstUploadProgress
  },
  error
}

export default config