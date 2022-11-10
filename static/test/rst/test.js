import runTest from '/static/test/rst/src/testClient.js';

let rstHandlers

/**
 * A callback to handle progress updates from the rst
 * @param {*} progress An object containing progress updates from the rst
 */
function handleProgress(progress) {
    if (progress.test === 'ping') {
        rstHandlers?.pingProgress?.(progress.avgLatency, progress.avgJitter)

    } else if (progress.test === 'upload') {
        rstHandlers?.uploadProgress?.(progress.throughput)
        
    } else if (progress.test === 'download') {
        rstHandlers?.downloadProgress?.(progress.throughput)

    } else {
        return;
    }
}

/**
 * Runs the rst speed test
 * @param {*} handlerConfig An object containing callbacks to handle rst progress updates
 * @returns 
 */
async function runRst(handlerConfig) {
    try {
        rstHandlers = handlerConfig

        const results = await runTest(handleProgress)
        return results

    } catch (error) {
        throw 'Error while running RST: ' + error
    }
}

export default runRst