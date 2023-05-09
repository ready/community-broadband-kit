/**
 * Gets the median from an array of values
 * @param {*} array 
 * @returns The median value
 */
 function getMedian(array) {
  let concat = array;
  concat = concat.sort(
      function (a, b) { return a - b })

  let length = concat.length

  if (length % 2 === 1) {
      return concat[(length / 2) - .5]
  }
  else {
      return (concat[length / 2] + concat[(length / 2) - 1]) / 2
  }
}

/**
* Gets the rollup results by getting the median values across
* all three speed tests
* @param {*} results An object containing test results
* @returns An object containing rollup results
*/
function rollupResults(results) {
  const downloadMedian = getMedian([results.mlabDownload, results.rstDownload, results.ooklaDownload])
  const uploadMedian = getMedian([results.mlabUpload, results.rstUpload, results.ooklaUpload])
  const latencyMedian = getMedian([results.mlabLatency, results.rstLatency, results.ooklaLatency])
  const jitterMedian = getMedian([results.mlabJitter, results.rstJitter, results.ooklaJitter])

  return {
    medianDownload: downloadMedian,
    medianUpload: uploadMedian,
    medianLatency: latencyMedian,
    medianJitter: jitterMedian
  }
}

export default rollupResults