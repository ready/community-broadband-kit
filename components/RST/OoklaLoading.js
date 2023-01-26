import React from 'react'

import styles from './OoklaLoading.module.css'

const OoklaLoading = () => {
  return (
    <div className={styles.ooklaLoading}>
      <div className={styles.wifiSymbol}>
        <div className={styles.wifiCircle}></div>
        <div className={styles.wifiCircle}></div>
        <div className={styles.wifiCircle}></div>	
        <div className={styles.wifiCircle}></div>
      </div>
    </div>
  )
}

export default OoklaLoading
