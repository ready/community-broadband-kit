import React from 'react'

import ServiceStatusTag from '../Tags/ServiceStatusTag'

import styles from './ResultCard.module.css'

const ResultCard = ({ icon, iconAlt, title, result, units, serviceStatus }) => {

  return (
    <div className={styles.resultCard}>
      <div className={styles.resultCardTitle}>
        <img
          src={icon}
          alt={iconAlt}
        />
        <h4>{title}</h4>
      </div>
      <div className={styles.speed}>
        <p className={styles.result}>{result}</p>
        <span className={styles.units}> {units}</span>
      </div>
      {serviceStatus &&
        <ServiceStatusTag
          size='small'
          serviceStatus={serviceStatus}
        />}
    </div>
  )
}

export default ResultCard
