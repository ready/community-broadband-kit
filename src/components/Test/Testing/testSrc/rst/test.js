import runTest from './src/testClient.js';

let rstHandlers
let setters

//const testTypeElement = document.getElementById('test-type')
let pingFlag
let downloadFlag
let uploadFlag

/**
 * A callback to handle progress updates from the rst
 * @param {*} progress An object containing progress updates from the rst
 */
function handleProgress(progress) {
    if (progress.test === 'ping') {
        if (!pingFlag) {
            setters.setTestType('Pinging')
            pingFlag = true
        }
        rstHandlers?.pingProgress?.(setters, progress.avgLatency, progress.avgJitter)

    } else if (progress.test === 'upload') {
        if (!uploadFlag) {
            setters.setTestType('Uploading')
            uploadFlag = true
        }
        rstHandlers?.uploadProgress?.(setters, progress.throughput)
        
    } else if (progress.test === 'download') {
        if (!downloadFlag) {
            setters.setTestType('Downloading')
            downloadFlag = true
        }
        rstHandlers?.downloadProgress?.(setters, progress.throughput)

    } else {
        return;
    }
}

/**
 * Runs the rst speed test
 * @param {*} handlerConfig An object containing callbacks to handle rst progress updates
 * @returns 
 */
async function runRst(state, handlerConfig) {
    try {
        rstHandlers = handlerConfig
        setters = state

        const results = await runTest(handleProgress)
        return results

    } catch (error) {
        throw new Error('Error while running RST: ' + error)
    }
}

export default runRst