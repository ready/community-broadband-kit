import React from 'react'
import styles from './StepCard.module.css'

const StepCard = ({ title, description, children }) => {
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

export default StepCard
