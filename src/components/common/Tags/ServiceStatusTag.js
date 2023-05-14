import React from 'react'

import styles from './ServiceStatusTag.module.css'

const ServiceStatusTag = ({ size, serviceStatus }) => {
  return (
    <p className={`${styles[serviceStatus]} ${styles[size]} ${styles.serviceStatusTag}`}>
      {serviceStatus}
    </p>
  )
}

export default ServiceStatusTag