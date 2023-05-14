import React from 'react'
import styles from '../Header.module.css'

const HeaderShareButtons = ({ 
  postTitle = 'Help our community in winning broadband grants by taking this internet speed test'
}) => {
  const testUrl = window.location.origin
  return (
    <div className={styles.headerShareButtons}>
      <div className={styles.iconLinkTwitter}>
        <a
          href={`https://twitter.com/share?url=${testUrl}&text=${postTitle}`}
          target='_blank'
          rel='noreferrer'
        >
          <img
            src='/icons/twitter-2.svg'
            height={22}
            width={22}
            alt='community toolkit twitter link'
          />
        </a>
      </div>
      <div className={styles.iconLinkLinkedIn}>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${testUrl}`}
          target='_blank'
          rel='noreferrer'
        >
          <img
            src='/icons/linkedin-2.svg'
            height={19}
            width={19}
            alt='community toolkit linkedin link'
            style={{ fill: 'red' }}
          />
        </a>
      </div>
      <div className={styles.iconLinkFacebook}>
        <a
          href={`https://www.facebook.com/sharer.php?u=${testUrl}`}
          target='_blank'
          rel='noreferrer'
        >
          <img
            src='/icons/facebook-2.svg'
            height={22}
            width={22}
            alt='community toolkit facebook link'
          />
        </a>
      </div>
      <div className={styles.iconLinkEmail}>
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=${postTitle}&body=${testUrl}+&ui=2&tf=1&pli=1`}
          target='_blank'
          rel='noreferrer'
        >
          <img
            src='/icons/mail.svg'
            height={22}
            width={22}
            alt='community toolkit email link'
          />
        </a>
      </div>
    </div>
  )
}

export default HeaderShareButtons