const headTemplate = require('./headTemplate')
const headerTemplate = require('./headerTemplate')
const footerTemplate = require('./footerTemplate')
const endTemplate = require('./endTemplate')

/**
 * Creates the html template for history page the site
 * @param {*} config an object containing the test configuration
 * @returns an html template
 */
function historyTemplate(config) {
    const head = headTemplate(config, config.ogImage)
    const header = headerTemplate(config)
    const footer = footerTemplate(config)
    const end = endTemplate(config)

    return `
        <!DOCTYPE html>
        <html lang="en">
        ${head}
        <body style="background-color: var(--color-gray-1)">
            ${header}
            <main class="main-container">
            <div class="column-container medium-width" id="history">
                <h1 class="l-heading bottom-margin center">Your Results</h1>
                <table class="table table-alternating full-width" id="history-table">
                <tr>
                    <th>Upload <span class="units">Mbps</span></th>
                    <th>Download <span class="units">Mbps</span></th>
                    <th>Latency <span class="units">ms</span></th>
                    <th>Jitter <span class="units">ms</span></th>
                    <th>Date</th>
                </tr>
                </table>
                <button class="underline-button" id="load-more-btn" onclick="loadMore()">Load more</button>
            </div>
            <div class="border-container border-container-half" style="margin: auto 0" id="history-empty">
                <h2 class="l-heading bottom-margin center">No results yet</h2>
                <h3 class="s-heading center">You may view your results after you take the internet strength test</h3>
            </div>
            </main>
            ${footer}
            ${end}
            <script type="module" src="/static/history/history.js"></script>
        </body>
        </html>    
    `
}

module.exports = historyTemplate