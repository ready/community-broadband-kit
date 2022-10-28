/**
 * Combines zones into a single MultiPolygon
 * @param zones An array of Zones
 * @return Returns a single MultiPolygon feature or null if zones is empty
 */
function combineAllZones ({
    zones = []
  }) {
    if (zones.length > 0) {
        const overallTerritory = zones[0].geom
        if (zones.length === 1) return overallTerritory
        zones.forEach((zone, i) => {
            if (i !== 0) {
                overallTerritory = turf.union(zone?.geom, overallTerritory)
            }
        })
        return overallTerritory
    }
    return null
  }

export { combineAllZones }