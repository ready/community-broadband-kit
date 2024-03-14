'use strict'

importScripts('/static/test/rst/src/string.js');

// The WebSocket address of the server
//const url = 'ws://localhost:4000';
const url = 'wss://test.ready.net';

let LOCAL_TESTING_FLAG
let BGA_URL
let APOLLO_CLIENT_NAME

/**
 * Runs the client-side component of the ping test.
 * Requests ping test from server and handles progress updates, returning the final results.
 * @returns A promise that resolves with the ping test results
 */
async function runPingTest() {
    // Create a WebSocket connection to the server
    const socket = new WebSocket(url);

    // Wait for the socket to open
    await new Promise ((resolve, reject) => {
        socket.onopen = () => {
            resolve();
        }
    });

    // Request the server to run the ping test
    socket.send(JSON.stringify({type: 'ping-req'}));

    return new Promise((resolve, reject) => {
        // Listen for messages from the server
        socket.onmessage = (incoming) => {
            // Try to parse the message from the server, returns if not JSON 
            let message;
            try {
                message = JSON.parse(incoming.data);
            } catch {
                return;
            }
            
            if (message.type === 'progress') {
                // Send progress update to the main client file
                postMessage(message);
    
            } else if (message.type === 'complete') {
                // Close the socket with the server
                socket.close();

                // Resolve with the ping test results
                resolve(message.results);
            }
        }
    });
}

/**
 * Runs the client-side component of the upload test.
 * Sends data to the server and requests for the server to
 * perform upload throughput calculations and send progress updates back,
 * returning the final upload throughput value.
 * @returns A promise that resolves with the upload throughput
 */
async function runUploadTest() {
    // Create a WebSocket connection to the server
    const socket = new WebSocket(url);

    // Wait for the socket to open
    await new Promise ((resolve, reject) => {
        socket.onopen = () => {
            resolve();
        }
    });

    // Size of message to send in bytes
    const msgSize = 20000;

    // Number of messages to send at a time
    const msgCount = 250;

    // Frequency to check if more data should be sent (in miliseconds)
    const sendInterval = 50;

    // ID of interval used to send data to client
    let send;

    // JSON message to send to server
    const data = JSON.stringify({
        type: 'upload-data',
        data: strMsg.substring(0, msgSize)
    });

    // Request the server to run the upload test
    socket.send(JSON.stringify({type: 'upload-req'}));

    // Check every sendInterval if more data should be sent
    send = setInterval(function() {
        // Send more data if socket buffer is empty
        if (socket.bufferedAmount === 0) {
            for (let i = 0; i < msgCount; i++) {
                socket.send(data);
            }
        }
    }, sendInterval);

    return new Promise((resolve, reject) => {
        // Listen for messages from the server
        socket.onmessage = (incoming) => {
            let message;
            try {
                message = JSON.parse(incoming.data);
            } catch {
                return;
            }

            if (message.type === 'progress') {
                // Send progress update to the main client file
                postMessage(message);

            } else if (message.type === 'complete') {
                // Stop sending data and close the socket with the server
                clearInterval(send);
                socket.close();

                // Resolve with the upload throughput
                resolve(message.results);
            }
        }
    });
}

/**
 * Runs the client-side component of the download test.
 * @returns 
 */
async function runDownloadTest() {
    // Duration of test in miliseconds
    const timeout = 10000;

    // Interval to send progress updates in miliseconds
    const tickAmt = 200;

    // Create a WebSocket connection to the server
    const socket = new WebSocket(url);

    // Wait for the socket to open
    await new Promise ((resolve, reject) => {
        socket.onopen = () => {
            resolve();
        }
    });

    // Request the server to run the download test
    socket.send(JSON.stringify({type: 'download-req'}));

    // Number of progress updates sent
    let tickCount = 0;

    // The total amount of bytes received from the server so far
    let totalBytes = 0;

    // The current throughput calculated in bytes per second
    let bytesPerSec = 0;

    // The current throughput calculated in Mbps
    let throughput = 0;

    // The time stamp of receiving the first message from the server
    let startTime;

    // The time elapsed since receiving the first message
    let duration;

    // The number of messages received from the server
    let messageCount = 0;

    // Listen for messages from the server
    return new Promise((resolve) => {
        socket.onmessage = (incoming) => {
            // On the first message from the server
            if (messageCount === 0) {
                // Get the start time of the test
                startTime = Date.now();

                // Set an interval to compute download throughput from arriving data
                let tick = setInterval(function() {
                    // Increment the tick count
                    tickCount++;

                    // Compute the time elapsed since the first message
                    duration = Date.now() - startTime;

                    // Calculate throughput in bps
                    bytesPerSec = totalBytes * 1000 / duration;

                    // Convert throughput to Mbps
                    throughput = bytesPerSec / 125000;
                    
                    // Send the current throughput to the main client file in a progress update
                    postMessage({
                        type: 'progress',
                        progress: {
                            test: 'download',
                            updateNum: tickCount,
                            throughput: throughput.toFixed(2)
                        }
                    })
                }, tickAmt);

                // Set a timeout to end the test after the time limit has passed
                setTimeout(function () {
                    // Stop sending progress updates
                    clearInterval(tick);

                    // Close the socket with the server
                    socket.close();

                    // Resolve with the upload throughput
                    resolve(throughput.toFixed(2));
                }, timeout);
            
            // If message is not the first message from the server
            } else {
                // Update the total bytes received
                totalBytes += incoming.data.length;
            }

            // Increment the message count
            messageCount++;
        }
    });
}

/**
 * Fetches the client metadata from the metadata rought and returns it in an object
 * @returns An object containing the metadata info about the client
 */
async function getMetadata() {
    return fetch('https://test.ready.net/metadata')
        .then(res => res.json())
        .then(incoming => {
            return {
                ip: incoming.ip,
                isp: incoming.isp,
                browserName: incoming.ua.browser.name || null,
                browserVersion: incoming.ua.browser.version || null,
                deviceType: incoming.ua.device.type || null,
                deviceVendor: incoming.ua.device.vendor || null,
                deviceModel: incoming.ua.device.model || null,
                engineName: incoming.ua.engine.name || null,
                engineVersion: incoming.ua.engine.version || null,
                osName: incoming.ua.os.name || null,
                osVersion: incoming.ua.os.version || null,
                cpu: incoming.ua.cpu.architecture || null,
                geolocEnabled: false,
                lat: incoming.loc.lat,
                long: incoming.loc.long
            }
    }).catch(err => console.log(err));
}

/**
 * Uploads the metadata and results to the database as a record
 * @param {*} metadata An object containing the client metadata
 * @param {*} results An object containing the test results
 * @returns 
 */
 async function uploadData(metadata, results) {
    const body = JSON.stringify({
        query: `mutation { rstAddData(data: {
            latency: ${results.latency},
            jitter: ${results.jitter},
            packetLoss: ${results.packetLoss},
            upload: ${results.upload},
            download: ${results.download},
            ipAddress: "${metadata.ip}",
            ispName: "${metadata.isp}",
            lat: ${metadata.lat},
            lon: ${metadata.lon},
            geolocationEnabled: ${metadata.geolocEnabled},
            browserName: "${metadata.browserName}",
            browserVersion: "${metadata.browserVersion}",
            deviceType: "${metadata.deviceType}",
            deviceVendor: "${metadata.deviceVendor}",
            deviceModel: "${metadata.deviceModel}",
            engineName: "${metadata.engineName}",
            engineVersion: "${metadata.engineVersion}",
            osName: "${metadata.osName}",
            osVersion: "${metadata.osVersion}",
            cpu: "${metadata.cpu}"
        }) {
            id
        }}`
    });

    return fetch(BGA_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apollographql-client-name': APOLLO_CLIENT_NAME
        },
        body: body
    })
    .then(res => res.json())
    .then (result => {
        // Return the id associated with the result record in the database
        return result.data.rstAddData.id;
    })
    .catch(err => console.error(err));
}

/**
 * Runs tests when a message is received from the main client file,
 * uploads test data to database, and sends test results to the main client file.
 */
onmessage = async function(e) {
    LOCAL_TESTING_FLAG = e.data.localFlag
    BGA_URL = e.data.bgaUrl
    APOLLO_CLIENT_NAME = e.data.apolloClientName

    let pingResults;
    let uploadResults;
    let downloadResults;

    try {
        pingResults = await runPingTest();
        uploadResults = await runUploadTest();
        downloadResults = await runDownloadTest();

    } catch {
        // Sends error message to main client file if there is a error running the test
        postMessage({type: 'error'});
        return;
    }

    // Construct results object
    let results = {
        latency: pingResults.latency,
        jitter: pingResults.jitter,
        packetLoss: pingResults.packetLoss,
        upload: uploadResults,
        download: downloadResults
    };

    // Upload metadata and results to the database and store the result id
    /*
    if (!LOCAL_TESTING_FLAG) {
        const resultId = await uploadData(metadata, results);
        results.resultId = resultId;
    }
    */

    // Send the results to the main client file
    postMessage({
        type: 'results',
        results
    });
}