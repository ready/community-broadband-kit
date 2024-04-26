'use strict'

import { formatNumber } from '/static/utils/formatNumber.js'
import { getAggregateMultitestResultsQuery } from '/static/map/getAggregateMultitestResultsQuery.js'
import { getZonesQuery } from '/static/map/getZonesQuery.js'
import { generatePieChart } from '/static/map/generatePieChart.js'
import { combineAllZones } from '/static/map/combineAllZones.js'

import {
    MAPBOX_TOKEN,
    MAP_LIGHT_STYLE,
    BGA_URL,
    MAP_COUNTY_LAYER_ID,
    MAP_COUNTY_LAYER_URL,
    DEFAULT_ORG_ID,
    DETROIT_COUNTY_GEOIDS,
    APOLLO_CLIENT_NAME
} from '/static/utils/constants.js'

// Document selectors
const communityName = document.getElementById('statistics-container-title').getAttribute('community-name')
const testsTaken = document.getElementById('tests-taken')
const totalAddresses = document.getElementById('total-addresses')
const counties = document.getElementById('counties')
// const orgId = '282'
const orgId = document.getElementById('map').getAttribute('org-id')
const statisticsContainerTitle = document.getElementById('statistics-container-title')
const statisticsSectionContainer = document.getElementById('section-container-statistics')
const countyStatistic = document.getElementById('county-statistic')
const backToOverall = document.getElementById('back-to-overall')
const clickToCounty = document.getElementById('click-to-expand')
const perCountyResults = document.getElementById('section-container-county-results')
const perCountyDownload = document.getElementById('per-county-download')
const perCountyUpload = document.getElementById('per-county-upload')
const perCountyLatency = document.getElementById('per-county-latency')
const perCountyJitter = document.getElementById('per-county-jitter')
const style = getComputedStyle(document.body)
const filterByOrgId = (orgId === '281'|| orgId === '505') ? '' : `(organizationId: ${orgId})`
const filterByOrgAndCounty = (orgId === '281'|| orgId === '505') ? '' : `(organizationId: ${orgId}, countyGeoids: ["${DETROIT_COUNTY_GEOIDS}"])`
const SPEED_RANK_COLOR_MAPPING = {
    'unserved': style.getPropertyValue('--color-served'),
    'underserved': style.getPropertyValue('--color-underserved'),
    'served': style.getPropertyValue('--color-served')
}
let highlightedCounty = []

/**
 * Renders the base map using the Map Box API
 * @returns A centered map
 */
function renderBaseMap() {
    mapboxgl.accessToken = MAPBOX_TOKEN
    return new mapboxgl.Map({
        container: 'map',
        style: MAP_LIGHT_STYLE,
        center: [-104.61462434623917, 39.10591903256045],
        zoom: 4
    })
}

/**
 * Generates a speed rank based on NTIA guidlines based on upload and download speeds
 * @param {*} {object} An object containing upload and download speeds
 * @returns The speed rank
 */
function generateSpeedRank({ upload, download, latency }) {
    if (upload <= 3 || download <= 25) return 'unserved'
    if (upload <= 20 || download <= 100) return 'underserved'
    return 'served'
}


function generateCountyGeoidAndColor(multiTestData) {
    const validGeoids = []
    const countyData = {}
    const colors = ['match', ['get', 'GEOID_county']]
    multiTestData?.forEach((county) => {
        const speedRank = generateSpeedRank({ upload: county.upload, download: county.download })
        if (county.countyGeoid) {
            colors.push(county.countyGeoid)
            colors.push(SPEED_RANK_COLOR_MAPPING[speedRank])
            validGeoids.push(county.countyGeoid)
            countyData[county.countyGeoid] = county
        }
    })
    colors.push('rgba(0,0,0,0)')
    return {
        geoids: validGeoids,
        colors: colors,
        countyData: countyData
    }
}

function resetToOverallView(map, data) {
    // Clear map styling
    map.setFilter(`${MAP_COUNTY_LAYER_ID}-click`, ['in', 'GEOID_county', ...[]]);
    // Show/hide back links
    backToOverall.style.display = 'none'
    clickToCounty.style.display = 'block'
    // Switch back to overall format styling
    countyStatistic.style.display = 'block'
    statisticsSectionContainer.style.gridTemplateColumns = 'auto auto auto'
    perCountyResults.style.display = 'none'
     // Update statistics
     statisticsContainerTitle.textContent = communityName
     const oldSvg = d3.select('.pie-chart').select('svg')
     oldSvg.remove()
     populateStatistics(data)
}

function renderSpeedLayer(map, data) {
    const validCountyData = generateCountyGeoidAndColor(data?.mapData)
    map.addSource(MAP_COUNTY_LAYER_ID, {
        type: 'vector',
        url: MAP_COUNTY_LAYER_URL,
    })
    map.addLayer({
        id: MAP_COUNTY_LAYER_ID,
        type: 'fill',
        source: MAP_COUNTY_LAYER_ID,
        'source-layer': MAP_COUNTY_LAYER_ID,
        paint: {
            'fill-color': validCountyData?.colors,
            'fill-opacity': 0.5
        },
        filter: ['in', 'GEOID_county', ...validCountyData?.geoids]
    })
    map.addLayer({
        id: `${MAP_COUNTY_LAYER_ID}-outline`,
        type: 'line',
        source: MAP_COUNTY_LAYER_ID,
        'source-layer': MAP_COUNTY_LAYER_ID,
        paint: {
            'line-color': 'yellow',
            'line-width': 3
        },
        filter: ['in', 'GEOID_county', ...highlightedCounty]
    })
    map.addLayer({
        id: `${MAP_COUNTY_LAYER_ID}-click`,
        type: 'line',
        source: MAP_COUNTY_LAYER_ID,
        'source-layer': MAP_COUNTY_LAYER_ID,
        paint: {
            'line-color': 'cyan',
            'line-width': 3
        },
        filter: ['in', 'GEOID_county', ...[]]
    })
    map.on('click', MAP_COUNTY_LAYER_ID, (e) => {
        const geoid = e.features[0].properties.GEOID_county
        // Set clicked state styling
        map.setFilter(`${MAP_COUNTY_LAYER_ID}-click`, ['in', 'GEOID_county', geoid]);
        // Show/hide back links
        backToOverall.style.display = 'block'
        clickToCounty.style.display = 'none'
        backToOverall.addEventListener("click", function(){ 
            resetToOverallView(map, data)
        })
        // Update top level statistics
        statisticsContainerTitle.textContent = e.features[0].properties.nameCounty
        const currentCountyData = validCountyData?.countyData[geoid]
        testsTaken.textContent = currentCountyData?.totalTests
        totalAddresses.textContent = currentCountyData?.totalAddresses
        countyStatistic.style.display = 'none'
        statisticsSectionContainer.style.gridTemplateColumns = 'auto auto'
        // Update pie chart
        const oldSvg = d3.select('.pie-chart').select('svg')
        oldSvg.remove()
        generatePieChart({ data: currentCountyData })
        // Median results
        perCountyResults.style.display = 'block'
        perCountyDownload.textContent = formatNumber({ number: currentCountyData?.download, decimals: 2 })
        perCountyUpload.textContent = formatNumber({ number: currentCountyData?.upload, decimals: 2 })
        perCountyLatency.textContent = formatNumber({ number: currentCountyData?.latency, decimals: 2 })
        perCountyJitter.textContent = formatNumber({ number: currentCountyData?.jitter, decimals: 2 })
    })

    // Update styling when mousing over
    map.on('mousemove', MAP_COUNTY_LAYER_ID, (e) => {
        map.getCanvas().style.cursor = 'pointer'
        if (e.features.length > 0) {
            highlightedCounty = [e.features[0].properties.GEOID_county]
            map.setFilter(`${MAP_COUNTY_LAYER_ID}-outline`, ['in', 'GEOID_county', ...highlightedCounty]);
        }
    })
    map.on('mouseleave', MAP_COUNTY_LAYER_ID, () => {
        map.getCanvas().style.cursor = ''
        highlightedCounty = []
        map.setFilter(`${MAP_COUNTY_LAYER_ID}-outline`, ['in', 'GEOID_county', ...highlightedCounty]);
    })
}

/**
 * Gets the community zones by org id from the database
 */
function getZones() {
    return fetch(BGA_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apollographql-client-name': APOLLO_CLIENT_NAME
        },
        body: getZonesQuery({ filterByOrgId: filterByOrgId })
    })
    .then(res => res.json())
    .then (result => {
        return result
    })
    .catch(err => console.log(err))
}

/**
 * Gets aggregated multitest results from the database filtered by org id and county
 * @returns aggregated multitest results 
 */
function getMultiTestData() {
    return fetch(BGA_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apollographql-client-name': APOLLO_CLIENT_NAME
        },
        body: getAggregateMultitestResultsQuery({ filterByOrgAndCounty: filterByOrgAndCounty })
    })
    .then(res => res.json())
    .then (result => {
        const resultObj = result?.data?.getAggregateMultitestResults
        const data = {
            mapData: resultObj?.perCounty,
            totalTests: resultObj?.totalTests,
            totalAddresses: resultObj?.totalAddresses,
            multitestPerformanceRank: resultObj?.multitestPerformanceRank
        }
        return data
    })
    .catch(err => console.log(err))
}

/**
 * Populate the statistic card with data such as # of tests taken,
 * unique devices, and create a pie chart
 * @param {*} data 
 */
function populateStatistics(data) {
    testsTaken.textContent = data?.totalTests
    totalAddresses.textContent = data?.totalAddresses
    counties.textContent = data?.mapData?.length
    generatePieChart({ data: data })
}

// Event listener
let boundingBox = null
window.addEventListener('load', async () => {
    const map = renderBaseMap()
    map.on('load', async () => {
        // If not default toolkit, center map around territory
        if (!DEFAULT_ORG_ID.includes(orgId)) {
            await getZones().then((response) => {
                const zones = response?.data?.getZones
                const overallTerritory = combineAllZones({ zones: zones })
                if (overallTerritory) {
                    boundingBox = turf.bbox(overallTerritory)
                    map.fitBounds(boundingBox, {
                        offset: [100, 0],
                        padding: 300
                    })
                }
            })
        }
        await getMultiTestData().then((response) => {
            renderSpeedLayer(map, response)
            populateStatistics(response)
        })
    })
})

window.renderBaseMap = renderBaseMap