import { LOCAL_TESTING_FLAG } from './constants'

// Document selectors

/**
 * Callback to handle M-lab download throughput measurements
 * @param {*} download M-lab download throughput measurement in Mbps
 */
const mlabDownloadProgress = (state, download) => {
  state.setTestProgress(download)
}

/**
 * Callback to handle M-lab download final results
 * @param {*} download M-lab final download throughput result
 */
const mlabDownloadComplete = (state, download) => {
  state.setTestType('Uploading')
}

/**
 * Callback to handle M-lab upload throughput measurements
 * @param {*} upload M-lab upload throughput measurement in Mbps
 */
const mlabUploadProgress = (state, upload) => {
  state.setTestProgress(upload)
}

/**
 * Callback to handle M-lab upload final results
 * @param {*} upload M-lab final upload throughput result
 * @param {*} latency M-lab final upload latency result
 * @param {*} jitter M-lab final upload jitter result
 */
const mlabUploadComplete = (state, upload, latency, jitter) => {
  if (!LOCAL_TESTING_FLAG) {
    state.setTestSource('Speedtest.net')
  } else {
    state.setTestSource('WiFi.wtf')
    state.setTestType('Connecting')
  }
}

/**
 * Displays RST upon completion of the Speedtest.net test
 * @param {*} download 
 * @param {*} upload 
 * @param {*} latency 
 * @param {*} jitter 
 */
const ooklaComplete = (state, download, upload, latency, jitter) => {
  state.setTestSource('WiFi.wtf')
  state.setTestType('Connecting')
}

/**
 * Updates the RST test progress element with live ping result
 * @param {*} latency RST ping progress update
 * @param {*} jitter RST ping progress update
 */
const rstPingProgress = (state, latency, jitter) => {
  state.setTestProgress(latency)
}

/**
 * Updates the RST test progress element with live download result
 * @param {*} download RST download progress update
 */
const rstDownloadProgress = (state, download) => {
  state.setTestProgress(download)
}

/**
 * Updates the RST test progress element with live upload result
 * @param {*} download RST upload progress update
 */
const rstUploadProgress = (state, upload) => {
 state.setTestProgress(upload)
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
  ooklaComplete,
  rst: {
    pingProgress: rstPingProgress,
    downloadProgress: rstDownloadProgress,
    uploadProgress: rstUploadProgress
  },
  error
}

export default config