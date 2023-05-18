import React from 'react'

import Link from './Link/Link'
import styles from './FooterLinks.module.css'
import { useAppContext } from 'components/common/Context/AppContext'

const FooterSegmentLinks = () => {
  let links = []
  const { config } = useAppContext()
  
  if (config?.showBbmReferences) {
    links = [
      {
        text: 'Get Your Community\'s Broadband Kit',
        href: 'https://broadband.money/community-broadband-kit',
        target: '_blank' ,
        rel: 'noreferrer',
      },
      {
        text: 'Test History',
        href: '/',
        target: '_blank' ,
        rel: 'noreferrer',
      },
      {
        text: 'Contact Us',
        href: 'https://broadband.money/contact-us' 
      },
      {
        text: 'Join the Discussion',
        href:  'https://discuss.broadband.money/home'
      },
      {
        text: 'What are Broadband Audits?',
        href: 'https://broadband.money/broadband-grant-terms/broadband-audit' 
      }
    ]
  } else {
    links = [
      {
        text: 'Test History',
        href: '/',
        target: '_blank' ,
        rel: 'noreferrer',
      }
    ]
  }
  
  return (
    <div className={`${styles.footerLinks} ${styles.segmentLinks}`}>
      {links.map((link, index) => (
        <Link
          key={`${link.href}-${index}`}
          footerSegment='footerSegment'
          {...link}
        />
      ))}
    </div>
  )
}

export default FooterSegmentLinks
