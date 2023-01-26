// Declarations
let mlabHandlers
let setters
let mlabResults = {}
let sumJitter = 0
let countJitter = 0

const config = {
    userAcceptedDataPolicy: true,
    downloadworkerfile: "/test/m-lab/ndt7-download-worker.js",
    uploadworkerfile: "/test/m-lab/ndt7-upload-worker.js",
    metadata: {
        client_name: 'ndt7-html-example',
    },
}

/**
 * Handles the download measurements from the M-lab speed test
 * @param {*} data Data from the most recent M-lab download measurement
 */
function downloadMeasurement(data) {
    if (data.Source === 'client') {
        const throughput = data.Data.MeanClientMbps.toFixed(2)

        mlabHandlers?.downloadProgress?.(setters, throughput)
    }
}

/**
 * Handles the final result fom the M-lab download speed test
 * @param {*} data Data from the final result of the M-lab download test
 */
function downloadComplete(data) {
    const clientGoodput = data.LastClientMeasurement.MeanClientMbps.toFixed(2)

    mlabHandlers?.downloadComplete?.(setters, clientGoodput)
    mlabResults.download = clientGoodput
}

/**
 * Handles the upload measurements from the M-lab speed test
 * @param {*} data Data from the most recent M-lab upload measurement
 */
function uploadMeasurement(data) {
    if (data.Source === 'server') {
        const throughput = (data.Data.TCPInfo.BytesReceived / data.Data.TCPInfo.ElapsedTime * 8).toFixed(2)

        sumJitter += data.Data.TCPInfo.RTTVar / 1000
        countJitter++

        mlabHandlers?.uploadProgress?.(setters, throughput)
    }
}

/**
 * Handles the final result fom the M-lab upload speed test
 * @param {*} data Data from the final result of the M-lab upload test
 */
function uploadComplete(data) {
    sumJitter += (data.LastServerMeasurement?.TCPInfo.RTTVar / 1000)
    countJitter++

    const bytesReceived = data.LastServerMeasurement?.TCPInfo.BytesReceived
    const elapsed = data.LastServerMeasurement?.TCPInfo.ElapsedTime

    const throughput = (bytesReceived * 8 / elapsed).toFixed(2)
    const latency = (data.LastServerMeasurement?.BBRInfo.MinRTT / 1000).toFixed(2)
    const jitter = (sumJitter / countJitter).toFixed(2)

    mlabHandlers?.uploadComplete?.(setters, throughput, latency, jitter)

    mlabResults.upload = throughput
    mlabResults.latency = latency
    mlabResults.jitter = jitter
}

/**
 * Handles any errors that occur during M-lab test
 * @param {*} err The error message
 */
function error(err) {
    console.log('Error: ' + err)
}

/**
 * Runs the M-lab speed test
 * @param {*} handlerConfig An object containing callbacks to handle M-lab progress updates
 * @returns The results of the M-lab test
 */
async function runMlabTest(state, handlerConfig) {
    mlabHandlers = handlerConfig
    setters = state

    const exitcode = await window.ndt7.test(
        config,
        {
            serverChosen: () => {},
            downloadMeasurement: downloadMeasurement,
            downloadComplete: downloadComplete,
            uploadMeasurement: uploadMeasurement,
            uploadComplete: uploadComplete,
            error: error
        },
    )

    if (exitcode != 0 || isNaN(mlabResults.upload) 
        || isNaN(mlabResults.latency) || isNaN(mlabResults.jitter)) {
        throw 'Error while running M-Lab speed test'
    }

    return mlabResults
}

export default runMlabTest