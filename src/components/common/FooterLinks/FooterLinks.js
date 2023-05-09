import React, { useState, useEffect } from 'react'
import Link from '../../common/Link/Link'
import styles from './FooterLinks.module.css'

const FooterLinks = () => {
  const [testUrl, setTestUrl] = useState('')

  const postTitle = 'Help our community in winning broadband grants by taking this internet speed test'

  useEffect(() => { 
    setTestUrl(`${window.location.origin}`)
  }, [])

  return (
    <div className={styles.footerLinks}>
      <div className={`${styles.social} ${styles.horizontalLinks}`}>
        <div className={styles.horizontalLink}>
          <a
            href={`https://twitter.com/share?url=${testUrl}&text=${postTitle}`}
            target='_blank'
            rel='noreferrer'
          >
            <img
              src='/icons/twitter-2-white.svg'
              height={22}
              width={22}
              alt='community toolkit twitter link'
            />
          </a>
        </div>
        <div className={styles.horizontalLink}>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${testUrl}`}
            target='_blank'
            rel='noreferrer'
          >
            <img
              src='/icons/linkedin-2-white.svg'
              height={22}
              width={22}
              alt='community toolkit linkedin link'
              style={{ fill: 'red' }}
            />
          </a>
        </div>
        <div className={styles.horizontalLink}>
          <a
            href={`https://www.facebook.com/sharer.php?u=${testUrl}`}
            target='_blank'
            rel='noreferrer'
          >
            <img
              src='/icons/facebook-2-white.svg'
              height={22}
              width={22}
              alt='community toolkit facebook link'
            />
          </a>
        </div>
        <div className={styles.horizontalLink}>
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=${postTitle}&body=${testUrl}+&ui=2&tf=1&pli=1`}
            target='_blank'
            rel='noreferrer'
          >
            <img
              src='/icons/mail-white.svg'
              height={20}
              width={20}
              alt='community toolkit email link'
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default FooterLinks
