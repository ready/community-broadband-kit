const {
  getResults,
  getResultsFields
} = require('../utils/resultsUtils')
const headTemplate = require('./headTemplate')
const headerTemplate = require('./headerTemplate')
const landscapeBackgroundTemplate = require('./landscapeBackgroundTemplate')
const footerTemplate = require('./footerTemplate')
const endTemplate = require('./endTemplate')

/**
 * Creates the htnl template for the results page on the site
 * @param {*} id the ID associated with the result
 * @param {*} config an object containing the test configuration
 * @returns an html template
 */
async function resultsTemplate(id, config) {
  let ogImage;
  const header = headerTemplate(config)
  const landscapeBackground = landscapeBackgroundTemplate()
  const footer = footerTemplate(config)
  const end = endTemplate(config)
  const results = await getResults(id)
  const resultsFields = getResultsFields(results)

  if (resultsFields.serviceStatusText === 'Served') {
    ogImage = '/static/assets/served.png'
  } else if (resultsFields.serviceStatusText === 'Underserved') {
    ogImage = '/static/assets/underserved.png'
  } else if (resultsFields.serviceStatusText === 'Unserved') {
    ogImage = '/static/assets/unserved.png'
  } else {
    ogImage = config.ogImage
  }

  const head = headTemplate(config, ogImage)

  return `
    <!DOCTYPE html>
    <html lang="en">
    ${head}
    <body>
      <section class="section-container" style="padding-top:0;">
        ${header}
        <div class="hero-section-container center-content">
          <div class="wide-background-container">
            <h3 class="small-heading">You are <span class='large-result-tag ${resultsFields.serviceStatusClass}' id="service-status">${resultsFields.serviceStatusText}</span></h3>
            <p class="default-color">Following NTIA grant guidelines, reliable broadband connections should have at least 100 Mbps download and 20 Mbps upload.</p>
            <div class="results-cards-container">
              <div class="results-card">
                <div class="results-card-title">
                  <img src="/static/assets/icons/vertical-align-down.svg" width="14" alt='download icon'>
                  <h4>Download</h4>
                </div>
                <div class="speed-result">
                  <p class="result" id="download-rollup">${resultsFields.downloadRollup}</p>
                  <span class="units"> Mbps</span>
                </div>
                <p class="result-tag ${resultsFields.downloadServiceStatusClass}" id="download-service">${resultsFields.downloadServiceStatusText}</p>
              </div>
              <div class="results-card">
                <div class="results-card-title">
                  <img src="/static/assets/icons/vertical-align-top.svg" width="14" alt='upload icon'>
                  <h4>Upload</h4>
                </div>
                <div class="speed-result">
                  <p class="result" id="upload-rollup">${resultsFields.uploadRollup}</p>
                  <span class="units"> Mbps</span>
                </div>
                <p class="result-tag ${resultsFields.uploadServiceStatusClass}" id="upload-service">${resultsFields.uploadServiceStatusText}</p>
              </div>
              <div class="results-card">
                <div class="results-card-title">
                  <img src="/static/assets/icons/dashboard.svg" width="14" alt='latency icon'>
                  <h4>Latency</h4>
                </div>
                <div class="speed-result">
                  <p class="result" id="latency-rollup">${resultsFields.latencyRollup}</p>
                  <span class="units"> ms</span>
                </div>
                <p class="service-status" id="latency-service"></p>
              </div>
              <div class="results-card">
                <div class="results-card-title">
                  <img src="/static/assets/icons/build.svg" width="14" alt='jitter icon'>
                  <h4>Jitter</h4>
                </div>
                <div class="speed-result">
                  <p class="result" id="jitter-rollup">${resultsFields.jitterRollup}</p>
                  <span class="units"> ms</span>
                </div>
              </div>
            </div>
            <a class="see-more-button" id="see-more-results" onclick="seeMore()">See breakdown by test &#8594;</a>

            <div class="column-container" id="more-results" style="gap: 2em">
              <div class="test-title">
                <h3>M-Lab</h3>
                <p class="result-tag ${resultsFields.mlabServiceStatusClass}" id="mlab-service-status">${resultsFields.mlabServiceStatusText}</p>
              </div>
              <div class="results-cards-container">
                <div class="results-card">
                  <div class="results-card-title">
                    <img src="/static/assets/icons/vertical-align-down.svg" width="14" alt='download icon'>
                    <h4>Download</h4>
                  </div>
                  <div class="speed-result">
                    <p class="result" id="mlab-download">${resultsFields.mlabDownload}</p>
                    <span class="units"> Mbps</span>
                  </div>
                  <p class="result-tag ${resultsFields.mlabDownloadServiceStatusClass}" id="mlab-download-service">${resultsFields.mlabDownloadServiceStatusText}</p>
                </div>
                <div class="results-card">
                  <div class="results-card-title">
                    <img src="/static/assets/icons/vertical-align-top.svg" width="14" alt='upload icon'>
                    <h4>Upload</h4>
                  </div>
                  <div class="speed-result">
                    <p class="result" id="mlab-upload">${resultsFields.mlabUpload}</p>
                    <span class="units"> Mbps</span>
                  </div>
                  <p class="result-tag ${resultsFields.mlabUploadServiceStatusClass}" id="mlab-upload-service">${resultsFields.mlabUploadServiceStatusText}</p>
                </div>
                <div class="results-card">
                  <div class="results-card-title">
                    <img src="/static/assets/icons/dashboard.svg" width="14" alt='latency icon'>
                    <h4>Latency</h4>
                  </div>
                  <div class="speed-result">
                    <p class="result" id="mlab-latency">${resultsFields.mlabLatency}</p>
                    <span class="units"> ms</span>
                  </div>
                  <p class="service-status" id="mlab-latency-service"></p>
                </div>
                <div class="results-card">
                  <div class="results-card-title">
                    <img src="/static/assets/icons/build.svg" width="14" alt='jitter icon'>
                    <h4>Jitter</h4>
                  </div>
                  <div class="speed-result">
                    <p class="result" id="mlab-jitter">${resultsFields.mlabJitter}</p>
                    <span class="units"> ms</span>
                  </div>
                </div>
              </div>
              <div class="test-title">
                <h3>Speedtest.net</h3>
                <p class="result-tag ${resultsFields.ooklaServiceStatusClass}" id="ookla-service-status">${resultsFields.ooklaServiceStatusText}</p>
              </div>
              <div class="results-cards-container">
                <div class="results-card">
                  <div class="results-card-title">
                    <img src="/static/assets/icons/vertical-align-down.svg" width="14" alt='download icon'>
                    <h4>Download</h4>
                  </div>
                  <div class="speed-result">
                    <p class="result" id="ookla-download">${resultsFields.ooklaDownload}</p>
                    <span class="units"> Mbps</span>
                  </div>
                  <p class="result-tag ${resultsFields.ooklaDownloadServiceStatusClass}" id="ookla-download-service">${resultsFields.ooklaDownloadServiceStatusText}</p>
                </div>
                <div class="results-card">
                  <div class="results-card-title">
                    <img src="/static/assets/icons/vertical-align-top.svg" width="14" alt='upload icon'>
                    <h4>Upload</h4>
                  </div>
                  <div class="speed-result">
                    <p class="result" id="ookla-upload">${resultsFields.ooklaUpload}</p>
                    <span class="units"> Mbps</span>
                  </div>
                  <p class="result-tag ${resultsFields.ooklaDownloadServiceStatusClass}" id="ookla-upload-service">${resultsFields.ooklaUploadServiceStatusText}</p>
                </div>
                <div class="results-card">
                  <div class="results-card-title">
                    <img src="/static/assets/icons/dashboard.svg" width="14" alt='latency icon'>
                    <h4>Latency</h4>
                  </div>
                  <div class="speed-result">
                    <p class="result" id="ookla-latency">${resultsFields.ooklaLatency}</p>
                    <span class="units"> ms</span>
                  </div>
                  <p class="service-status" id="ookla-latency-service"></p>
                </div>
                <div class="results-card">
                  <div class="results-card-title">
                    <img src="/static/assets/icons/build.svg" width="14" alt='jitter icon'>
                    <h4>Jitter</h4>
                  </div>
                  <div class="speed-result">
                    <p class="result" id="ookla-jitter">${resultsFields.ooklaJitter}</p>
                    <span class="units"> ms</span>
                  </div>
                </div>
              </div>
              <div class="test-title">
                <h3>WiFi.wtf <sup class="beta">beta</sup></h3>
                <p class="result-tag ${resultsFields.rstServiceStatusClass}" id="rst-service-status">${resultsFields.rstServiceStatusText}</p>
              </div>
              <div class="results-cards-container">
                <div class="results-card">
                  <div class="results-card-title">
                    <img src="/static/assets/icons/vertical-align-down.svg" width="14" alt='download icon'>
                    <h4>Download</h4>
                  </div>
                  <div class="speed-result">
                    <p class="result" id="rst-download">${resultsFields.rstDownload}</p>
                    <span class="units"> Mbps</span>
                  </div>
                  <p class="result-tag ${resultsFields.rstDownloadServiceStatusClass}" id="rst-download-service">${resultsFields.rstDownloadServiceStatusText}</p>
                </div>
                <div class="results-card">
                  <div class="results-card-title">
                    <img src="/static/assets/icons/vertical-align-top.svg" width="14" alt='upload icon'>
                    <h4>Upload</h4>
                  </div>
                  <div class="speed-result">
                    <p class="result" id="rst-upload">${resultsFields.rstUpload}</p>
                    <span class="units"> Mbps</span>
                  </div>
                  <p class="result-tag ${resultsFields.rstUploadServiceStatusClass}" id="rst-upload-service">${resultsFields.rstUploadServiceStatusText}</p>
                </div>
                <div class="results-card">
                  <div class="results-card-title">
                    <img src="/static/assets/icons/dashboard.svg" width="14" alt='latency icon'>
                    <h4>Latency</h4>
                  </div>
                  <div class="speed-result">
                    <p class="result" id="rst-latency">${resultsFields.rstLatency}</p>
                    <span class="units"> ms</span>
                  </div>
                  <p class="service-status" id="rst-latency-service"></p>
                </div>
                <div class="results-card">
                  <div class="results-card-title">
                    <img src="/static/assets/icons/build.svg" width="14" alt='jitter icon'>
                    <h4>Jitter</h4>
                  </div>
                  <div class="speed-result">
                    <p class="result" id="rst-jitter">${resultsFields.rstJitter}</p>
                    <span class="units"> ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>  
          ${landscapeBackground}
        </div>
      </section>
      ${footer}
      ${end}
      <script type="module" src="/static/results/results.js"></script>
    </body>
    </html>
  `
}

module.exports = resultsTemplate