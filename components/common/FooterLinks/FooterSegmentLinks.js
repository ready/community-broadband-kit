import React from 'react'
import { useRouter } from 'next/router'

import Link from '../../common/Link/Link'
import styles from './FooterLinks.module.css'

const FooterSegmentLinks = () => {
  const router = useRouter()
  const links = [
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
    },
    {
      text: 'Built with 🤍 by Broadband Money',
      href: 'https://broadband.money/',
      target: '_blank'
    },
  ]
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
