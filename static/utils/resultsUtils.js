'use strict'

// Document selectors
const mlabDownloadElement = document.getElementById('mlab-download')
const mlabUploadElement = document.getElementById('mlab-upload')
const mlabLatencyElement = document.getElementById('mlab-latency')
const mlabJitterElement = document.getElementById('mlab-jitter')
const mlabUploadServiceStatus = document.getElementById('mlab-upload-service')
const mlabDownloadServiceStatus = document.getElementById('mlab-download-service')
const mlabServiceStatus = document.getElementById('mlab-service-status')

const rstDownloadElement = document.getElementById('rst-download')
const rstUploadElement = document.getElementById('rst-upload')
const rstLatencyElement = document.getElementById('rst-latency')
const rstJitterElement = document.getElementById('rst-jitter')
const rstUploadServiceStatus = document.getElementById('rst-upload-service')
const rstDownloadServiceStatus = document.getElementById('rst-download-service')
const rstServiceStatus = document.getElementById('rst-service-status')

const ooklaDownloadElement = document.getElementById('ookla-download')
const ooklaUploadElement = document.getElementById('ookla-upload')
const ooklaLatencyElement = document.getElementById('ookla-latency')
const ooklaJitterElement = document.getElementById('ookla-jitter')
const ooklaUploadServiceStatus = document.getElementById('ookla-upload-service')
const ooklaDownloadServiceStatus = document.getElementById('ookla-download-service')
const ooklaServiceStatus = document.getElementById('ookla-service-status')

const downloadRollupElement = document.getElementById('download-rollup')
const downloadServiceStatus = document.getElementById('download-service')
const uploadRollupElement = document.getElementById('upload-rollup')
const uploadServiceStatus = document.getElementById('upload-service')
const latencyRollupElement = document.getElementById('latency-rollup')
const jitterRollupElement = document.getElementById('jitter-rollup')
const serviceStatusElement = document.getElementById('service-status')


const facebookBtn = document.querySelector(".facebook-btn")
const twitterBtn = document.querySelector(".twitter-btn")
const linkedInBtn = document.querySelector(".linkedin-btn")
const emailBtn = document.querySelector(".email-btn")
let resultUrl

/**
 * Set links for social media share buttons
 */
function setShareButton() {
    // Link to share
    let postUrl = encodeURI(resultUrl)
    let postTitle = encodeURI("Check out my internet strength test results ")

    facebookBtn.setAttribute(
        "href",
        `https://www.facebook.com/sharer.php?u=${postUrl}`
    )
    
    twitterBtn.setAttribute(
        "href",
        `https://twitter.com/share?url=${postUrl}&text=${postTitle}`
    )

    linkedInBtn.setAttribute(
        "href", 
        `https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`
    )

    emailBtn.setAttribute(
        "href",
        `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=${postTitle}&body=${postUrl}+&ui=2&tf=1&pli=1`
    ); 
}

/**
 * Gets result fields
 * @param {*} results 
 * @returns An object with results
 */
async function getResultsFields(results) {
    return fetch('/getResultsFields', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            results
        })
    })
    .then((res) => {
        return res.json()
    })
    .catch((error) => {
        console.log(error)
    })
}

/**
 * Displays test results to the user
 * @param {*} results An object containing test results
 */
async function displayResults(results) {
    const resultsFields = await getResultsFields(results)

    serviceStatusElement.textContent = resultsFields.serviceStatusText
    serviceStatusElement.className += resultsFields.serviceStatusClass
    downloadRollupElement.textContent = results.medianDownload
    uploadRollupElement.textContent = results.medianUpload
    latencyRollupElement.textContent = results.medianLatency
    jitterRollupElement.textContent = results.medianJitter
    downloadServiceStatus.textContent = resultsFields.downloadServiceStatusText
    downloadServiceStatus.className += resultsFields.downloadServiceStatusClass
    uploadServiceStatus.textContent = resultsFields.uploadServiceStatusText
    uploadServiceStatus.className += resultsFields.uploadServiceStatusClass
    
    mlabDownloadElement.textContent = results.mlabDownload
    mlabUploadElement.textContent = results.mlabUpload
    mlabLatencyElement.textContent = results.mlabLatency
    mlabJitterElement.textContent = results.mlabJitter
    mlabDownloadServiceStatus.textContent = resultsFields.mlabDownloadServiceStatusText
    mlabDownloadServiceStatus.className += resultsFields.mlabDownloadServiceStatusClass
    mlabUploadServiceStatus.textContent = resultsFields.mlabUploadServiceStatusText
    mlabUploadServiceStatus.className += resultsFields.mlabUploadServiceStatusClass
    mlabServiceStatus.textContent = resultsFields.mlabServiceStatusText
    mlabServiceStatus.className += resultsFields.mlabServiceStatusClass

    rstDownloadElement.textContent = results.rstDownload
    rstUploadElement.textContent = results.rstUpload
    rstLatencyElement.textContent = results.rstLatency
    rstJitterElement.textContent = results.rstJitter
    rstDownloadServiceStatus.textContent = resultsFields.rstDownloadServiceStatusText
    rstDownloadServiceStatus.className += resultsFields.rstDownloadServiceStatusClass
    rstUploadServiceStatus.textContent = resultsFields.rstUploadServiceStatusText
    rstUploadServiceStatus.className += resultsFields.rstUploadServiceStatusClass
    rstServiceStatus.textContent = resultsFields.rstServiceStatusText
    rstServiceStatus.className += resultsFields.rstServiceStatusClass

    ooklaDownloadElement.textContent = results.ooklaDownload || 'N/A'
    ooklaUploadElement.textContent = results.ooklaUpload || 'N/A'
    ooklaLatencyElement.textContent = results.ooklaLatency || 'N/A'
    ooklaJitterElement.textContent = results.ooklaJitter || 'N/A'
    ooklaDownloadServiceStatus.textContent = resultsFields.ooklaDownloadServiceStatusText
    ooklaDownloadServiceStatus.className += resultsFields.ooklaDownloadServiceStatusClass
    ooklaUploadServiceStatus.textContent = resultsFields.ooklaUploadServiceStatusText
    ooklaUploadServiceStatus.className += resultsFields.ooklaUploadServiceStatusClass
    ooklaServiceStatus.textContent = resultsFields.ooklaServiceStatusText
    ooklaServiceStatus.className += resultsFields.ooklaServiceStatusClass

    // Construct the link to the current result from the result id
    // resultUrl = `${window.location.origin}/results/${results.resultId}`

    // Replace the test link in history with the link to the result
    // history.replaceState({}, '', resultUrl)

    // Set up the share buttons
    // if (facebookBtn) {
    //     setShareButton();
    // }
}

/**
 * Gets the median from an array of values
 * @param {*} array 
 * @returns The median value
 */
function getMedian(array) {
    let concat = array.filter(el => el)

    concat = concat.sort(
        function (a, b) { return a - b })

    let length = concat.length

    if (length % 2 == 1) {
        return concat[(length / 2) - .5]
    }
    else {
        return ((parseFloat(concat[length / 2]) + parseFloat(concat[(length / 2) - 1])) / 2).toFixed(2)
    }
}

/**
 * Gets the rollup results by getting the median values across
 * all three speed tests
 * @param {*} results An object containing test results
 * @returns An object containing rollup results
 */
function rollupResults(results) {
    const downloadMedian = getMedian([results.mlabDownload, results.rstDownload, results.ooklaDownload])
    const uploadMedian = getMedian([results.mlabUpload, results.rstUpload, results.ooklaUpload])
    const latencyMedian = getMedian([results.mlabLatency, results.rstLatency, results.ooklaLatency])
    const jitterMedian = getMedian([results.mlabJitter, results.rstJitter, results.ooklaJitter])

    return {
        download: downloadMedian,
        upload: uploadMedian,
        latency: latencyMedian,
        jitter: jitterMedian
    }
}

export { displayResults, rollupResults }