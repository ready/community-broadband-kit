const headTemplate = require('./headTemplate')
const headerTemplate = require('./headerTemplate')
const footerTemplate = require('./footerTemplate')
const endTemplate = require('./endTemplate')
const landscapeBackgroundTemplate = require('./landscapeBackgroundTemplate')

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
  const landscapeBackground = landscapeBackgroundTemplate()

  return `
    <!DOCTYPE html>
    <html lang="en">
    ${head}
    <body>
      <section class="section-container center-content" style="padding-top:0;">
        ${header}
        <div class="hero-section-container">
          <div class="column-container center-content" id="history" style="gap: 2em;">
            <h1 class="small-heading">Your Results</h1>
            <div class="wide-background-container" style="max-width: 100%; gap: 1em;">
              <table class="table table-alternating" id="history-table">
                <tr>
                  <th>Upload <span class="units">Mbps</span></th>
                  <th>Download <span class="units">Mbps</span></th>
                  <th>Latency <span class="units">ms</span></th>
                  <th>Jitter <span class="units">ms</span></th>
                  <th>Date <span class="units">&nbsp</span></th></th>
                </tr>
              </table>
              <button class="underline-button" id="load-more-btn" onclick="loadMore()">Load more</button>
            </div>
          </div>
          <div class="background-container" id="history-empty" style="align-self: center">
            <h2 class="main-heading">No results yet</h2>
            <h3 class="section-description">You may view your results after you take the internet strength test</h3>
          </div>
          ${landscapeBackground}
        </div>
      </section>
      ${footer}
      ${end}
      <script type="module" src="/static/history/history.js"></script>
    </body>
    </html>  
  `
}

module.exports = historyTemplate