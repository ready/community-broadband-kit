import React from 'react'

import styles from './Link.module.css'

const Link = ({ href, text, onClick, className, footerSegment, ...props }) => {
  return (
    <div
      onClick={onClick}
      className={`${styles.link} ${className || ''} ${footerSegment ? styles.footerSegment : ''}`}
    >
      <a
        href={href}
        {...props}
      >
        {text}
      </a>
    </div>
  )
}

export default Link
