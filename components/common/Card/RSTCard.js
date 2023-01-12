import React from 'react'

import styles from './RSTCard.module.css'

const RSTCard = ({ title, description, children }) => {
  return (
    <div className={styles.card}>
      {title &&
        <h2 className={styles.title}>{title}</h2>}
      {description &&
        <h3 className={styles.description}>{description}</h3>}
      {children}
    </div>
  )
}

export default RSTCard
