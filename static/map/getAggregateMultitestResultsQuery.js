/**
 * Query to get aggregate multitest results from the database
 * @param {*} filterByOrgAndCounty
 * @returns An object with aggregated results
 */
function getAggregateMultitestResultsQuery ({
    filterByOrgAndCounty = ''
  }) {
    const body = JSON.stringify({
        query: `query {
            getAggregateMultitestResults${filterByOrgAndCounty} {
                totalTests
                totalAddresses
                multitestPerformanceRank {
                    served
                    unserved
                    underserved
                }
                mlabPerformanceRank {
                    served
                    unserved
                    underserved
                }
                ooklaPerformanceRank {
                    served
                    unserved
                    underserved
                }
                rstPerformanceRank {
                    served
                    unserved
                    underserved
                }
                perCounty {
                    countyGeoid
                    totalTests
                    totalAddresses
                    upload
                    download
                    latency
                    jitter
                    multitestPerformanceRank {
                        served
                        unserved
                        underserved
                    }
                    mlabPerformanceRank {
                        served
                        unserved
                        underserved
                    }
                    ooklaPerformanceRank {
                        served
                        unserved
                        underserved
                    }
                    rstPerformanceRank {
                        served
                        unserved
                        underserved
                    }
                }
            }
        }`
    })
    return body
  }

export { getAggregateMultitestResultsQuery }