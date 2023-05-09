import React from 'react'
import { FaFacebookSquare, FaTwitterSquare, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import styles from './RSTShareButtons.module.css'

const RSTShareButtons = () => {

  const postUrl = window.location.href
  const postTitle = "Check out my internet strength test results "

  return (
    <div className={styles.shareButtons}> 
      <div className={styles.shareButtonText}>Share Your Results</div>
      <a href={`https://www.facebook.com/sharer.php?u=${postUrl}`} target="_blank" rel="noreferrer"><FaFacebookSquare size={28} color={'var(--color-button)'}></FaFacebookSquare></a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`} target="_blank" rel="noreferrer"><FaLinkedin size={28} color={'var(--color-button)'}></FaLinkedin></a>
      <a href={`https://twitter.com/share?url=${postUrl}&text=${postTitle}`} target="_blank" rel="noreferrer"><FaTwitterSquare size={28} color={'var(--color-button)'}></FaTwitterSquare></a>
      <a href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=${postTitle}&body=${postUrl}+&ui=2&tf=1&pli=1`} target="_blank" rel="noreferrer"><FaEnvelope size={28} color={'var(--color-button)'}></FaEnvelope></a>
    </div>
  )
}

export default RSTShareButtons