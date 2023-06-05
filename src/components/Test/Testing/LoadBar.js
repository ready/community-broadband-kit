import React, { useState, useEffect } from 'react'
import styles from './LoadBar.module.css'

const LoadBar = ({ testSource }) => {
  const [testsDone, setTestsDone] = useState([])

  useEffect(() => {
    setTestsDone([...testsDone, testSource])
  }, [testSource, testsDone])

  const tests = {
    'M-Lab': {
      label: 'M-Lab',
      id: 'mlab-load-bar',
      href: 'https://speed.measurementlab.net/#/'
    },
    'Cloudflare': {
      label: 'Cloudflare',
      id: 'cloudflare-load-bar',
      href: 'https://speed.cloudflare.com/'
    },
    'Speedtest.net': {
      label: 'Speedtest',
      id: 'ookla-load-bar',
      href: 'https://www.speedtest.net/'
    },
    'RST': {
      label: 'RST',
      id: 'rst-load-bar',
      href: 'https://wifi.wtf/'
    }
  }

  return (
    <div className={styles.loadBar} id="load-bar">
      {Object.keys(tests)?.map((test, index) => (
        <div
          key={index}
          id={tests?.[test]?.id}
          className={`${styles.loadBarShape} ${(testsDone.includes(test)) ? styles.loadStarted : styles.notStarted}`}
        >
          <a
            className={tests?.[test]?.label === 'RST' ? styles.loadLabelRst : styles.loadLabel}
            href={tests?.[test]?.href}
            target='_blank'
            rel='noreferrer'
          >
            {tests?.[test]?.label}
          </a>
        </div>
      ))}
    </div>
  )
}

export default LoadBar
