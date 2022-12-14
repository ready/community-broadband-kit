const legendTemplate = require("./legendTemplate")
const statisticsTemplate = require("./statisticsTemplate")

/**
 * Creates the html template for map on the site
 * @param {*} config an object containing the test configuration
 * @returns an html template
 */
function mapTemplate(config) {
  const legend = legendTemplate()
  const statistics = statisticsTemplate(config)
  
  return `
    <section id="map-container" class="section-container" style="background-color:var(--color-background3); ">
      <h2 class="section-heading center white" style="color: var(--color-gray-0);">How are we doing?</h2>
      <p class="section-description white" style="margin-top:16px;">View results from your community. See how your data will help bring better broadband to your area.</p>
      <p id="map-disclaimer" class="section-description white" style="margin-top:16px;">Please use a device with a larger screen to view the map.</p>
      <div class="section-container-map" id="map-section" style="margin-top:16px;">
        <div class="map" id="map" org-id=${config.organization.id} community-name=${config.communityName}></div>
        ${legend}
        ${statistics}
      </div>
    </section>
    <link href="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css" rel="stylesheet">
    <script src="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.js"></script>
    <script src='https://unpkg.com/@turf/turf@6/turf.min.js'></script>
    <script type="module" src="/static/map/map.js"></script>
  `
}

module.exports = mapTemplate
