'use strict'

import { LOCAL_TESTING_FLAG } from '/static/utils/constants.js'
import { BGA_URL, APOLLO_CLIENT_NAME } from '/static/utils/constants.js'

/**
 * Creates a Web Worker to run the ping, upload, and download tests, returning the results
 * @param {*} handleProgress A callback function to handle progress updates during the test
 * @returns A Promise that resolves with an object containing the test results
 */
async function runTest(handleProgress = () => {}, metadata) {
    // Create Web Worker to run test
    const testWorker = new Worker('/static/test/rst/src/testWorker.js');

    let results = new Promise(function(resolve, reject) {
        // Handle each message type
        testWorker.onmessage = (e) => {
            switch (e.data.type) {
                case 'progress':
                    // Handle progress with the callback parameter
                    handleProgress(e.data.progress);
                    break;
                case 'results':
                    // Terminate the Web Worker and resolve with the results
                    testWorker.terminate()
                    resolve(e.data.results);
                    break;
                case 'error':
                    // Terminate the Web Worker and reject the Promise
                    testWorker.terminate()
                    reject();
                    break;
                default:
                    return;
            } 
        }
    });

    // Send geolocation to the Web Worker, thereby beginning the test
    testWorker.postMessage({
        localFlag: LOCAL_TESTING_FLAG,
        bgaUrl: BGA_URL,
        apolloClientName: APOLLO_CLIENT_NAME,
        metadata: metadata
    });

    return results;
}

export default runTest