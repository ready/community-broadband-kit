import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

import Link from '../../common/Link/Link'

import styles from './FooterLinks.module.css'

const FooterLinks = () => {
  const router = useRouter()
  const links = [
  //   {
  //     text: 'MS BEAM OFFICE',
  //     href:"https://www.beam.ms.gov",
  //     target:'_blank' ,
  //     rel:'noreferrer',
  //   },
  //   {
  //     text: '© 2022 Mississippi',
  //   },
    // {
    //   text: 'Contact us',
    //   href:"https://www.beam.ms.gov/contact-us",
    //   target:'_blank' ,
    //   rel:'noreferrer',
    // },
  //   {
  //     text: 'Portal built and maintained by Ready.net',
  //     href:"https://ready.net",
  //     target:'_blank' ,
  //     rel:'noreferrer',

  //   },
  //   {
  //     text: 'Call us: +1 (601) - 439 - 2535',
  //     href:'tel:16014392535'
  //   },
  ]

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
      {/* <div className={styles.contact}>
      <NextLink href="https://www.beam.ms.gov/contact-us" >
          <a target='_blank' rel='noreferrer'>
           Contact Us
          </a>
        </NextLink>
      </div>
      <div className={styles.contact}>
      <NextLink href='tel:6013595029' >
          <a target='_blank' rel='noreferrer'>
           To contact the BEAM office Call 601-359-5029
          </a>
        </NextLink>
      </div> */}
      {/* <div className={styles.newsLetter}>
        <NewsLetter header />
      </div> */}
      {/* <div className={styles.discussion} style={{ marginTop: '12px' }}>
        <NextLink href='https://broadbandms.com'>
          <a rel='noreferrer' target='_blank'>
            Branding & Communications
          </a>
        </NextLink>
      </div>
      { <div className={`${styles.social} ${styles.horizontalLinks}`}>
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
          href='https://www.linkedin.com/company/broadbandmoney'
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
          href='https://twitter.com/broadbandmoney'
          target='_blank'
          rel='noreferrer'
        />
      </div> */}
    </div>
  )
}

export default FooterLinks
