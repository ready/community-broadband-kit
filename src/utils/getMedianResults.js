/**
 * Gets the median from an array of values
 * @param {*} array 
 * @returns The median value
 */
function getMedian(array) {
  let concat = array.filter((el) => el)
  let length = concat.length
  if (length === 0) return undefined

  concat = concat.sort(
      function (a, b) { return a - b })

  if (length % 2 == 1) {
      return parseFloat(concat[(length / 2) - .5])
  }
  else {
      return ((parseFloat(concat[length / 2]) + parseFloat(concat[(length / 2) - 1])) / 2).toFixed(2)
  }
}

/**
* Gets the rollup results by getting the median values across
* all three speed tests
* @param {*} results An object containing test results
* @returns An object containing rollup results
*/
function getMedianResults(results) {
  const downloadMedian = getMedian([results?.mlabDownload, results?.rstDownload, results?.ooklaDownload, results?.cloudflareDownload])
  const uploadMedian = getMedian([results?.mlabUpload, results?.rstUpload, results?.ooklaUpload, results?.cloudflareUpload])
  const latencyMedian = getMedian([results?.mlabLatency, results?.rstLatency, results?.ooklaLatency, results?.cloudflareLatency])
  const jitterMedian = getMedian([results?.mlabJitter, results?.rstJitter, results?.ooklaJitter, results?.cloudflareJitter])

  return {
    medianDownload: downloadMedian,
    medianUpload: uploadMedian,
    medianLatency: latencyMedian,
    medianJitter: jitterMedian
  }
}

export default getMedianResults