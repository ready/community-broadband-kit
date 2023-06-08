const speedtestCustomLink = 'https://community.speedtestcustom.com'

/**
 * Runs the ookla speed test
 * @param {*} completeHandler A callback which runs when the ookla test is complete
 * @returns An object containing ookla speed test results
 */
async function runOoklaTest(state, completeHandler) {
  const ooklaResults = new Promise((resolve) => {
    async function ooklaTestCompleted(event) {
      if (event.origin !== speedtestCustomLink) {
        return;
      }

      const results = {
        download: (event.data.download / 1000).toFixed(2),
        upload: (event.data.upload / 1000).toFixed(2),
        latency: event.data.latency.minimum.toFixed(2),
        jitter: event.data.latency.jitter.toFixed(2)
      }

      completeHandler(state, results.download, results.upload, results.latency, results.jitter)
      document.body.removeChild(document.getElementById('speedtest-custom-iframe'))
      resolve(results)
    }
    window.addEventListener("message", ooklaTestCompleted)
  })

  const iframe = document.createElement('iframe')
  iframe.id = 'speedtest-custom-iframe'
  iframe.src = speedtestCustomLink
  iframe.display = 'none'
  iframe.referrerPolicy = 'origin'
  document.body.appendChild(iframe)

  return ooklaResults
}

export default runOoklaTest