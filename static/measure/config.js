'use strict'

import { LOCAL_TESTING_FLAG } from '/static/utils/constants.js'

// Document selectors
const ooklaLoadingElement = document.getElementById('ookla-loading')
const testElement = document.getElementById('test')
const testSourceElement = document.getElementById('test-source')
const testTypeElement = document.getElementById('test-type')
const testProgressElement = document.getElementById('test-progress')
const instructions = document.getElementById('instructions')
const ooklaLoadBar = document.getElementById('ookla-load-bar')
const rstLoadBar = document.getElementById('rst-load-bar')
const errorElement = document.getElementById('error')
const resultsElement = document.getElementById('results')

/**
 * Displays the Speedtest.net test element 
 */
function displayOokla() {
  ooklaLoadingElement.style.display = 'block'
  testTypeElement.style.display = 'none'
  testProgressElement.style.display = 'none'
  testSourceElement.textContent = 'Running Speedtest.net...'
  ooklaLoadBar.classList.replace('load-bar-not-started', 'load-bar-started')
}

/**
 * Displays the RST test element 
 */
function displayRst() {
  testProgressElement.style.visibility = 'hidden'
  ooklaLoadingElement.style.display = 'none'
  testProgressElement.style.display = 'block'
  testTypeElement.style.display = 'block'
  testSourceElement.textContent = 'Running RST...'
  testTypeElement.textContent = 'Connecting'
  rstLoadBar.classList.replace('load-bar-not-started', 'load-bar-started')
}

/**
 * Callback to handle M-lab download throughput measurements
 * @param {*} download M-lab download throughput measurement in Mbps
 */
const mlabDownloadProgress = (download) => {
  testProgressElement.textContent = download + ' Mbps'
  testProgressElement.style.visibility = 'visible'
}

/**
 * Callback to handle M-lab download final results
 * @param {*} download M-lab final download throughput result
 */
const mlabDownloadComplete = (download) => {
  testTypeElement.textContent = 'Uploading'
}

/**
 * Callback to handle M-lab upload throughput measurements
 * @param {*} upload M-lab upload throughput measurement in Mbps
 */
const mlabUploadProgress = (upload) => {
  testProgressElement.textContent = upload + ' Mbps'
}
/**
 * Callback to handle M-lab upload final results
 * @param {*} upload M-lab final upload throughput result
 * @param {*} latency M-lab final upload latency result
 * @param {*} jitter M-lab final upload jitter result
 */
const mlabUploadComplete = (upload, latency, jitter) => {
  if (!LOCAL_TESTING_FLAG) {
    displayOokla()
  } else {
    displayRst()
  }
}

/**
 * Displays RST upon completion of the Speedtest.net test
 * @param {*} download 
 * @param {*} upload 
 * @param {*} latency 
 * @param {*} jitter 
 */
const ooklaComplete = (download, upload, latency, jitter) => {
  displayRst()
}

/**
 * Updates the RST test progress element with live ping result
 * @param {*} latency RST ping progress update
 * @param {*} jitter RST ping progress update
 */
const rstPingProgress = (latency, jitter) => {
  testProgressElement.style.visibility = 'visible'
  testProgressElement.textContent = latency + ' ms'
}

/**
 * Updates the RST test progress element with live download result
 * @param {*} download RST download progress update
 */
const rstDownloadProgress = (download) => {
  testProgressElement.textContent = download + ' Mbps'
}

/**
 * Updates the RST test progress element with live upload result
 * @param {*} download RST upload progress update
 */
const rstUploadProgress = (upload) => {
  testProgressElement.textContent = upload + ' Mbps'
}

/**
 * Callback to handle any errors that occur during the test
 * @param {*} error The error message
 */
const error = (error) => {
  console.log(error)
  instructions.style.display = 'none'
  testElement.style.display = 'none'
  resultsElement.style.display = 'none'
  errorElement.style.display = 'flex'
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