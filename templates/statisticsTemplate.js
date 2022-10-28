const medianResultsTemplate = require("./medianResultsTemplate")

/**
 * Creates the html template for the statistic cards on the map 
 * @param {*} config an object containing the test configuration
 * @returns an html template
 */
function statisticsTemplate(config) {
    const medianResults = medianResultsTemplate()

    return `
        <div class="statistics">
            <p class="back-to-overall" id="back-to-overall" style="display: none">Back to overall results</p>
            <h1 class="statistics-container-title" id="statistics-container-title" community-name=${config.communityName}>${config.communityName}</h1>
            <section class="section-container-statistics" id="section-container-statistics">
                <div>
                <div class="statistics-text">Tests</div>
                    <h2 class="statistics-value" id="tests-taken">0</h2>
                </div>
                <div>
                <div class="statistics-text">Devices</div>
                    <h2 class="statistics-value" id="unique-devices">0</h2>
                </div>
                <div id="county-statistic">
                    <div class="statistics-text">Counties</div>
                    <h2 class="statistics-value" id="counties">0</h2>
                </div>
            </section>
            <section class="section-container-pie-chart">
                <div class="statistics-text">Performance rank breakdown</div>
                <div class="pie-chart"></div>
            </section>
            <section class="section-container-county-results" id="section-container-county-results" style="display: none">
                <div class="statistics-text">Median results</div>
                <div class="per-county-container">
                    ${medianResults}
                </div>
            </section>
            <p class="click-to-expand" id="click-to-expand">Click on a county to see more details</p>
        </div>
        <script src="https://d3js.org/d3.v4.min.js"></script>
        <script src="https://d3js.org/d3-scale-chromatic.v0.3.min.js"></script>
    `
}

module.exports = statisticsTemplate
