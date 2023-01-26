import React, { useState } from 'react'

import ResultCard from './ResultCard'
import ServiceStatusTag from './ServiceStatusTag'

import styles from './Result.module.css'

const Result = ({ results, resultsFields }) => {
  const [seeMoreResults, setSeeMoreResults] = useState(false)

  const cards = [
    {
      icon: '/icons/vertical-align-down.svg',
      iconAlt: 'download icon',
      title: 'Download',
      units: 'Mbps',
    },
    {
      icon: '/icons/vertical-align-top.svg',
      iconAlt: 'upload icon',
      title: 'Upload',
      units: 'Mbps',
    },
    {
      icon: '/icons/dashboard.svg',
      iconAlt: 'latency icon',
      title: 'Latency',
      units: 'ms'
    },
    {
      icon: '/icons/build.svg',
      iconAlt: 'jitter icon',
      title: 'Jitter',
      units: 'ms'
    }
  ]

  const allResults = {
    medianResults: {
      status: resultsFields?.serviceStatusText,
      results: [
        {
          result: results?.medianDownload,
          serviceStatus: resultsFields?.downloadServiceStatusText
        },
        {
          result: results?.medianUpload,
          serviceStatus: resultsFields?.uploadServiceStatusText
        },
        {
          result: results?.medianLatency
        },
        {
          result: results?.medianJitter
        }
      ]
    },
    'M-Lab': {
      status: resultsFields?.mlabServiceStatusText,
      results: [
        {
          result: results?.mlabDownload,
          serviceStatus: resultsFields?.mlabDownloadServiceStatusText
        },
        {
          result: results?.mlabUpload,
          serviceStatus: resultsFields?.mlabUploadServiceStatusText
        },
        {
          result: results?.mlabLatency
        },
        {
          result: results?.mlabJitter
        }
      ]
    },
    'Speedtest.net': {
      status: resultsFields?.ooklaServiceStatusText,
      results: [
        {
          result: results?.ooklaDownload,
          serviceStatus: resultsFields?.ooklaDownloadServiceStatusText
        },
        {
          result: results?.ooklaUpload,
          serviceStatus: resultsFields?.ooklaUploadServiceStatusText
        },
        {
          result: results?.ooklaLatency
        },
        {
          result: results?.ooklaJitter
        }
      ]
    },
    'WiFi.wtf': {
      status: resultsFields?.rstServiceStatusText,
      results: [
        {
          result: results?.rstDownload,
          serviceStatus: resultsFields?.rstDownloadServiceStatusText
        },
        {
          result: results?.rstUpload,
          serviceStatus: resultsFields?.rstUploadServiceStatusText
        },
        {
          result: results?.rstLatency
        },
        {
          result: results?.rstJitter
        }
      ]
    }
  }

  const moreResults = Object?.keys(allResults)?.slice(1)

  return (
    <div className={styles.results}>
      <div className={styles.resultCardsContainer}>
        {cards.map((card, index) => (
          <ResultCard
            key={index}
            icon={card.icon}
            iconAlt={card.iconAlt}
            title={card.title}
            result={allResults?.medianResults?.results?.[index]?.result}
            units={card.units}
            serviceStatus={allResults?.medianResults?.results?.[index]?.serviceStatus}
          />
        ))}
      </div>
      <p
        onClick={() => setSeeMoreResults(!seeMoreResults)}
        className={styles.seeMore}
        style={{ display: seeMoreResults ? 'none' : 'block' }}
      >
        See breakdown by test &#8594;
      </p>
      {seeMoreResults &&
        <div className={styles.moreResults}>
          {moreResults.map((result, id) => (
            <div key={id}>
              <div className={styles.testTitle}>
                <h3>{result}</h3>
                <ServiceStatusTag
                  size='small'
                  serviceStatus={allResults?.[result]?.status}
                />
              </div>
              <div className={styles.resultCardsContainer}>
                {cards.map((card, index) => (
                  <ResultCard
                    key={index}
                    icon={card.icon}
                    iconAlt={card.iconAlt}
                    title={card.title}
                    result={allResults?.[result]?.results?.[index]?.result}
                    units={card.units}
                    serviceStatus={allResults?.[result]?.results?.[index]?.serviceStatus}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export default Result