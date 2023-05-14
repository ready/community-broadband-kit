import React from 'react'
import styles from './Logo.module.css'

const Logo = ({ src }) => {
  return (
    <div
      className={`${styles.logo}`}
    >
      <a href="/">
        <img src={src} alt='logo' />
      </a>
    </div>
  )
}

export default Logo
