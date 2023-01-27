import React from 'react'

import Image from 'next/image'
import styles from './ReportContain.module.css'

const ReportContain = ({ verb, blurb, iconSrc, page }) => {
  return (
    <div className={styles.reportContain}>
      <div className={styles.iconVerb}>
        <div className={styles.icon}>
          <img src={iconSrc} alt='report icon' />
        </div>
        <div className={styles.verb}>
          <h2>
            {verb}
          </h2>
        </div>
      </div>
      <p className={styles.blurb}>{blurb}</p>
    </div>
  )
}

export default ReportContain
