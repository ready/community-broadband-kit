'use strict'

import { BGA_URL } from '/static/utils/constants.js'
import { rollupResults } from "/static/utils/resultsUtils.js"
import { getUuid } from '/static/utils/cookies.js'

// Document selectors
const historyElement = document.getElementById('history')
const historyEmptyElement = document.getElementById('history-empty')
const table = document.getElementById('history-table');
const loadMoreBtn = document.getElementById('load-more-btn')

const userId = getUuid()
const NUM_COLUMNS = 5

let hasNext
let next = null

/**
 * Fills the table with the results in the page array
 * @param {*} results An array of test results from the database
 */
function fillTable(results) {
    results.forEach((result) => {
        // Create a table row element
        const row = document.createElement('tr')

        // Set the url of the row to the result route
        const url = `/results/${result.id}`;
        row.onclick = () => {window.location = url}

        const rowData = []

        // Create the column elements for the row and append it to the array
        for (let i = 0; i < NUM_COLUMNS; i++) {
            const td = document.createElement('td')
            row.appendChild(td)
            rowData.push(td);
        }

        // Retrieve the results
        const rollup = rollupResults(result)

        // Set the text content for the row element
        rowData[0].textContent = rollup.upload
        rowData[1].textContent = rollup.download
        rowData[2].textContent = rollup.latency
        rowData[3].textContent = rollup.jitter
        rowData[4].textContent = new Date(result.createdAt).toLocaleDateString()

        // Append the row to the table
        table.appendChild(row)
    })
}

/**
 * Gets the next page's results from the database and displays them in the table.
 * @returns The number of results loaded
 */
async function loadMore() {
    // Get the next page of results from the database
    const results = await getNextPage()

    // Fill the table with the results
    fillTable(results);

    // Hide the next page button if it is the last page
    if (!hasNext) {
        loadMoreBtn.style.display = 'none'
    }

    return results.length;
}

/**
 * Get the next page of results from the database
 * @returns a results object
 */
async function getNextPage() {
    let nextArg = next ? `"${next}"` : next

    const body = JSON.stringify({
        query: `query {
            getMultitestResults (userId:"${userId}", cursorPagination:{next:${nextArg}}) {
              results {
                    id
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
                    ipAddress
                    ispName
                    createdAt
              },
              pageInfo {
                  hasNext
                  hasPrevious
                  next
                  previous
                  total
              }
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
        hasNext = result.data.getMultitestResults.pageInfo.hasNext
        next = result.data.getMultitestResults.pageInfo.next

        return result.data.getMultitestResults.results;
    })
    .catch(err => console.log(err))
}

// Display history table on load of page
window.addEventListener('load', async () => {
    // Load the first results
    const numResults = await loadMore();

    if (numResults === 0) {
        historyEmptyElement.style.display = 'flex'
    } else {
        historyElement.style.display = 'flex'
    }

    if (hasNext) {
        loadMoreBtn.style.display = 'block'
    }
})

window.loadMore = loadMore