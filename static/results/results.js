'use strict'

import { BGA_URL } from '/static/utils/constants.js'
import { displayResults }from '/static/utils/resultsUtils.js'

/**
 * Fetches the database record assocatiated with a test result id
 * @param {*} id The id of the result in the database
 * @returns The record associated with the result id
 */
async function getResults(id) {
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

// Event listener
window.addEventListener('load', async function() {
    // Discard out query string from the url
    const url = window.location.href.split('?')[0]

    // Split out the final slash from the url and isolate the result id
    const routes = url.split('/')
    let id = routes[routes.length - 1]
    
    if (!id) {
        id = routes[routes.length - 2]
    }

    // Fetch the record associated with the result id
    //const results = await getResults(id)
    //results.resultId = id

    // Display the metadata and results from the record
    //displayResults(results)
});