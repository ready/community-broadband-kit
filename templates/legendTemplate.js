/**
 * Creates an html template for the legend
 * @returns an html template
 */
function legendTemplate() {
    return `
        <div class="legend">
            <div class="legend-item">
                <div class="legend-item-icon" style="background-color: var(--color-unserved)"></div>
                <span class="legend-item-text">Unserved</span>
            </div>
            <div class="legend-item">
                <div class="legend-item-icon" style="background-color: var(--color-underserved)"></div>
                <span class="legend-item-text">Underserved</span>
            </div>
            <div class="legend-item">
                <div class="legend-item-icon" style="background-color: var(--color-served)"></div>
                <span class="legend-item-text">Served</span>
            </div>
        </div>
    `
}

module.exports = legendTemplate
