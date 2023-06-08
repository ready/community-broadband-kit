/**
 * Gets the overall service status based on NTIA guidlines
 * using download and upload speeds
 * @param {*} download Download speed
 * @param {*} upload Upload speed
 * @returns a string representing service status
 */
function getOverallServiceStatus(download, upload) {
    if (!download || !upload) {
      return 'Unknown'
    }

    if (download < 25 || upload < 3) {
        return 'Unserved'
    } else if (download < 100 || upload < 20) {
        return 'Underserved'
    } else {
        return 'Served'
    }
}

/**
 * Gets the service status for upload speed
 * @param {*} upload 
 * @returns a string representing service status
 */
function getUploadServiceStatus(upload) {
  if (!upload) {
    return 'Unknown'
  }

  if (upload < 3) {
    return 'Unserved'
  } else if (upload < 20) {
    return 'Underserved'
  } else {
    return 'Served'
  }
}

/**
 * Gets the service status for download speed
 * @param {*} download 
 * @returns a string representing service status
 */
function getDownloadServiceStatus(download) {
  if (!download) {
    return 'Unknown'
  }

  if (download < 25) {
    return 'Unserved'
  } else if (download < 100) {
    return 'Underserved'
  } else {
    return 'Served'
  }
}

const classNameMap = {
  'Unknown': 'result-tag-unknown',
  'Unserved': 'result-tag-unserved',
  'Underserved': 'result-tag-underserved',
  'Served': 'result-tag-served'
}

/**
 * Gets content to display on the results page from an object of test results
 * @param {*} results An object containing speed test results
 * @returns An object containing information to display on the results page
 */
export default function getServiceStatus(results) {
  const serviceStatusText = getOverallServiceStatus(results.medianDownload, results.medianUpload)
  const serviceStatusClass = classNameMap[serviceStatusText]
  const downloadServiceStatusText = getDownloadServiceStatus(results.medianDownload)
  const downloadServiceStatusClass = classNameMap[downloadServiceStatusText]
  const uploadServiceStatusText = getUploadServiceStatus(results.medianUpload)
  const uploadServiceStatusClass = classNameMap[uploadServiceStatusText]
  
  const mlabServiceStatusText = getOverallServiceStatus(results.mlabDownload, results.mlabUpload)
  const mlabServiceStatusClass = classNameMap[mlabServiceStatusText]
  const mlabDownloadServiceStatusText = getDownloadServiceStatus(results.mlabDownload)
  const mlabDownloadServiceStatusClass = classNameMap[mlabDownloadServiceStatusText]
  const mlabUploadServiceStatusText = getUploadServiceStatus(results.mlabUpload)
  const mlabUploadServiceStatusClass = classNameMap[mlabUploadServiceStatusText]

  const cloudflareServiceStatusText = getOverallServiceStatus(results.cloudflareDownload, results.cloudflareUpload)
  const cloudflareServiceStatusClass = classNameMap[cloudflareServiceStatusText]
  const cloudflareDownloadServiceStatusText = getDownloadServiceStatus(results.cloudflareDownload)
  const cloudflareDownloadServiceStatusClass = classNameMap[cloudflareDownloadServiceStatusText]
  const cloudflareUploadServiceStatusText = getUploadServiceStatus(results.cloudflareUpload)
  const cloudflareUploadServiceStatusClass = classNameMap[cloudflareUploadServiceStatusText]

  const rstServiceStatusText = getOverallServiceStatus(results.rstDownload, results.rstUpload)
  const rstServiceStatusClass = classNameMap[rstServiceStatusText]
  const rstDownloadServiceStatusText = getDownloadServiceStatus(results.rstDownload)
  const rstDownloadServiceStatusClass = classNameMap[rstDownloadServiceStatusText]
  const rstUploadServiceStatusText = getUploadServiceStatus(results.rstUpload)
  const rstUploadServiceStatusClass = classNameMap[rstUploadServiceStatusText]

  const ooklaServiceStatusText = getOverallServiceStatus(results.ooklaDownload, results.ooklaUpload)
  const ooklaServiceStatusClass = classNameMap[ooklaServiceStatusText]
  const ooklaDownloadServiceStatusText = getDownloadServiceStatus(results.ooklaDownload)
  const ooklaDownloadServiceStatusClass = classNameMap[ooklaDownloadServiceStatusText]
  const ooklaUploadServiceStatusText = getUploadServiceStatus(results.ooklaUpload)
  const ooklaUploadServiceStatusClass = classNameMap[ooklaUploadServiceStatusText]

  return {
      serviceStatusText,
      serviceStatusClass,
      downloadServiceStatusText,
      downloadServiceStatusClass,
      uploadServiceStatusText,
      uploadServiceStatusClass,
      mlabServiceStatusText,
      mlabServiceStatusClass,
      mlabDownloadServiceStatusText,
      mlabDownloadServiceStatusClass,
      mlabUploadServiceStatusText,
      mlabUploadServiceStatusClass,

      cloudflareServiceStatusText,
      cloudflareServiceStatusClass,
      cloudflareDownloadServiceStatusText,
      cloudflareDownloadServiceStatusClass,
      cloudflareUploadServiceStatusText,
      cloudflareUploadServiceStatusClass,
      
      rstServiceStatusText,
      rstServiceStatusClass,
      rstDownloadServiceStatusText,
      rstDownloadServiceStatusClass,
      rstUploadServiceStatusText,
      rstUploadServiceStatusClass,
      ooklaServiceStatusText,
      ooklaServiceStatusClass,
      ooklaDownloadServiceStatusText,
      ooklaDownloadServiceStatusClass,
      ooklaUploadServiceStatusText,
      ooklaUploadServiceStatusClass
  }
}