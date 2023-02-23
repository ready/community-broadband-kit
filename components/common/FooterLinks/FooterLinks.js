import React from 'react'
import Image from 'next/image'
import NextLink from 'next/link'

import Link from '../../common/Link/Link'

import styles from './FooterLinks.module.css'

const FooterLinks = () => {

  return (
    <div className={styles.footerLinks}>
      <div className={`${styles.social} ${styles.horizontalLinks}`}>
        <Link
          className={styles.horizontalLink}
          text={
            <img
              alt='linkedin icon'
              src='/icons/linkedin.svg'
              height={24}
              width={24}
            />
          }
          href='https://www.linkedin.com/sharing/share-offsite/?url=https://toolkit.broadband.money'
          target='_blank'
          rel='noreferrer'
        />
        <Link
          className={styles.horizontalLink}
          text={
            <img
              alt='twitter icon'
              src='/icons/twitter.svg'
              height={24}
              width={24}
            />
          }
          href='https://twitter.com/intent/tweet?url=https%3A%2F%2Ftoolkit.broadband.money&text=Help%20our%20community%20in%20winning%20broadband%20grants%20by%20taking%20this%20internet%20speed%20testy'
          target='_blank'
          rel='noreferrer'
        />
      </div>
    </div>
  )
}

export default FooterLinks
