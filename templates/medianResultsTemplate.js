/**
 * Creates the html template for the median result cards
 * @returns an html template
 */
function medianResultsTemplate() {
    return `
        <div class="results-card">
            <div class="per-county-results-card-title">
                <img src="/static/assets/icons/vertical-align-down.svg" width="14" class="results-card-icon" alt='download icon'>
                <h4>Download</h4>
            </div>
            <div class="per-county-speed-result">
                <p class="per-county-result" id="per-county-download"></p>
                <span class="units"> Mbps</span>
            </div>
            <p class="service-status" id="download-service"></p>
        </div>
        <div class="results-card">
            <div class="per-county-results-card-title">
                <img src="/static/assets/icons/vertical-align-top.svg" width="14" class="results-card-icon" alt='upload icon'>
                <h4>Upload</h4>
            </div>
            <div class="per-county-speed-result">
                <p class="per-county-result" id="per-county-upload"></p>
                <span class="units"> Mbps</span>
            </div>
            <p class="service-status" id="upload-service"></p>
        </div>
        <div class="results-card">
            <div class="per-county-results-card-title">
                <img src="/static/assets/icons/dashboard.svg" width="14" class="results-card-icon" alt='latency icon'>
                <h4>Latency</h4>
            </div>
            <div class="per-county-speed-result">
                <p class="per-county-result" id="per-county-latency"></p>
                <span class="units"> ms</span>
            </div>
            <p class="service-status" id="latency-service"></p>
        </div>
        <div class="results-card">
            <div class="per-county-results-card-title">
                <img src="/static/assets/icons/build.svg" width="14" class="results-card-icon" alt='jitter icon'>
                <h4>Jitter</h4>
            </div>
            <div class="per-county-speed-result">
                <p class="per-county-result" id="per-county-jitter"></p>
                <span class="units"> ms</span>
            </div>
        </div>
    `
}

module.exports = medianResultsTemplate