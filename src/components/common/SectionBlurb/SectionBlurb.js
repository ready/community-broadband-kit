import React from 'react'
import styles from './SectionBlurb.module.css'

const SectionBlurb = ({ title, description, section, children }) => {
  return (
    <>
      <div className={`${styles.title} ${section ? styles[section] : ''}`}>
        <h1>{title}</h1>
      </div>
      <div className={`${styles.description} ${section ? styles[section] : ''}`}>
        <p>{description}</p>
        {children}
      </div>
    </>
  )
}

export default SectionBlurb
