/**
 * Query to get the org's zones from the database
 * @param {*} filterByOrgId
 * @returns An object containing data for the zone
 */
function getZonesQuery ({
    filterByOrgId = ''
  }) {
    const body = JSON.stringify({
        query: `query {
            getZones${filterByOrgId} {
                id
                name
                geom
            }
        }`
    })
    return body
  }

export { getZonesQuery }