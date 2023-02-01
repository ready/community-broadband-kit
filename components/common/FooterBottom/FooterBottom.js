import React from 'react'

import Logo from '../Logo/Logo'
import Copyright from '../Copyright/Copyright'
import styles from './FooterBottom.module.css'
import { useRouter } from 'next/router'

const FooterBottom = () => {
  const router = useRouter()
  return (
    <div className={styles.footerBottom}>
      <div className={styles.logo} onClick={()=>router.push('/')}>
        <img src={'/logos/community_logo.svg'} alt='community logo' />
      </div>
      <Copyright />
    </div>
  )
}

export default FooterBottom
