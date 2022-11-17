const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { BGA_URL } = require('./constants')

/**
 * Gets the overall service status based on NTIA guidlines
 * using download and upload speeds
 * @param {*} download Download speed
 * @param {*} upload Upload speed
 * @returns a string representing service status
 */
function getOverallServiceStatus(download, upload) {
    // if (download < 25 || upload < 3 || latency >= 100 ) {
    if (download < 25 || upload < 3) {
        return 'Unserved'
    } else if (download < 100 || upload < 20) {
        return 'Underserved'
    } else {
        return 'Served'
    }
}

/**
 * Gets the service status for upload speed
 * @param {*} upload 
 * @returns a string representing service status
 */
function getUploadServiceStatus(upload) {
    if (upload < 3) {
        return 'Unserved'
    } else if (upload < 20) {
        return 'Underserved'
    } else {
        return 'Served'
    }
}

/**
 * Gets the service status for download speed
 * @param {*} download 
 * @returns a string representing service status
 */
function getDownloadServiceStatus(download) {
    if (download < 25) {
        return 'Unserved'
    } else if (download < 100) {
        return 'Underserved'
    } else {
        return 'Served'
    }
}

/**
 * Gets the class name for styling tags based on service status
 * @param {*} status 
 * @returns a class name
 */
function getServiceClassName(status) {
    if (status === 'Unserved') {
        return ' result-tag-unserved'
    } else if (status === 'Underserved') {
        return ' result-tag-underserved'
    } else {
        return ' result-tag-served'
    }
}

/**
 * Fetches the results from a result id
 * @param {*} id The id of the results to fetch
 * @returns An object containing the fetched results
 */
exports.getResults = async (id) => {
    const body = JSON.stringify({
        query: `query {
            getMultitestResult (id:"${id}") {
                mlabUpload
                mlabDownload
                mlabLatency
                mlabJitter
                rstLatency
                rstJitter
                rstUpload
                rstDownload
                ooklaLatency
                ooklaJitter
                ooklaUpload
                ooklaDownload
                medianLatency
                medianJitter
                medianUpload
                medianDownload
            }
        }`
    });

    return fetch(BGA_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    })
    .then(res => res.json())
    .then (result => {
        return result.data.getMultitestResult;
    })
    .catch(err => console.log(err));
}

/**
 * Gets content to display on the results page from an object of test results
 * @param {*} results An object containing speed test results
 * @returns An object containing information to display on the results page
 */
exports.getResultsFields = (results) => {
    const serviceStatusText = getOverallServiceStatus(results.medianDownload, results.medianUpload)
    const serviceStatusClass = getServiceClassName(serviceStatusText)
    const downloadServiceStatusText = getDownloadServiceStatus(results.medianDownload)
    const downloadServiceStatusClass = getServiceClassName(downloadServiceStatusText)
    const uploadServiceStatusText = getUploadServiceStatus(results.medianUpload)
    const uploadServiceStatusClass = getServiceClassName(uploadServiceStatusText)
    
    const mlabServiceStatusText = getOverallServiceStatus(results.mlabDownload, results.mlabUpload)
    const mlabServiceStatusClass = getServiceClassName(mlabServiceStatusText)
    const mlabDownloadServiceStatusText = getDownloadServiceStatus(results.mlabDownload)
    const mlabDownloadServiceStatusClass = getServiceClassName(mlabDownloadServiceStatusText)
    const mlabUploadServiceStatusText = getUploadServiceStatus(results.mlabUpload)
    const mlabUploadServiceStatusClass = getServiceClassName(mlabUploadServiceStatusText)

    const rstServiceStatusText = getOverallServiceStatus(results.rstDownload, results.rstUpload)
    const rstServiceStatusClass = getServiceClassName(rstServiceStatusText)
    const rstDownloadServiceStatusText = getDownloadServiceStatus(results.rstDownload)
    const rstDownloadServiceStatusClass = getServiceClassName(rstDownloadServiceStatusText)
    const rstUploadServiceStatusText = getUploadServiceStatus(results.rstUpload)
    const rstUploadServiceStatusClass = getServiceClassName(rstUploadServiceStatusText)

    const ooklaServiceStatusText = getOverallServiceStatus(results.ooklaDownload, results.ooklaUpload)
    const ooklaServiceStatusClass = getServiceClassName(ooklaServiceStatusText)
    const ooklaDownloadServiceStatusText = getDownloadServiceStatus(results.ooklaDownload)
    const ooklaDownloadServiceStatusClass = getServiceClassName(ooklaDownloadServiceStatusText)
    const ooklaUploadServiceStatusText = getUploadServiceStatus(results.ooklaUpload)
    const ooklaUploadServiceStatusClass = getServiceClassName(ooklaUploadServiceStatusText)

    return {
        serviceStatusText,
        serviceStatusClass,
        downloadServiceStatusText,
        downloadServiceStatusClass,
        uploadServiceStatusText,
        uploadServiceStatusClass,
        mlabServiceStatusText,
        mlabServiceStatusClass,
        mlabDownloadServiceStatusText,
        mlabDownloadServiceStatusClass,
        mlabUploadServiceStatusText,
        mlabUploadServiceStatusClass,
        rstServiceStatusText,
        rstServiceStatusClass,
        rstDownloadServiceStatusText,
        rstDownloadServiceStatusClass,
        rstUploadServiceStatusText,
        rstUploadServiceStatusClass,
        ooklaServiceStatusText,
        ooklaServiceStatusClass,
        ooklaDownloadServiceStatusText,
        ooklaDownloadServiceStatusClass,
        ooklaUploadServiceStatusText,
        ooklaUploadServiceStatusClass,
        downloadRollup: results.medianDownload,
        uploadRollup: results.medianUpload,
        latencyRollup: results.medianLatency,
        jitterRollup: results.medianJitter,
        mlabDownload: results.mlabDownload,
        mlabUpload: results.mlabUpload,
        mlabLatency: results.mlabLatency,
        mlabJitter: results.mlabJitter,
        rstDownload: results.rstDownload,
        rstUpload: results.rstUpload,
        rstLatency: results.rstLatency,
        rstJitter: results.rstJitter,
        ooklaDownload: results.ooklaDownload,
        ooklaUpload: results.ooklaUpload,
        ooklaLatency: results.ooklaLatency,
        ooklaJitter: results.ooklaJitter
    }
}