import React from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from './Logo.module.css'
import Link from 'next/link'

const Logo = ({ color, className }) => {
  const router = useRouter()
  const pathname = router.pathname

  const logoSrc = {
    black: '/logos/beam.svg',
    blue: '/logos/beam.svg',
    green: '/logos/beam.svg',
    magenta: '/logos/beam.svg',
    special: '/logos/beam.svg',
    white: '/logos/community_logo.svg',
    multicolor: '/logos/beam.svg',
    tribal: '/logos/beam.svg'
  }
  return (
    <div
      className={`${styles.logo} ${className || ''} ${
        pathname === '/recs-win-iija-broadband' ||
        pathname === '/tribal-win-iija-broadband'
          ? styles.RECLogo
          : ''
      }`}
    >
      <a href="/">
        <img src={logoSrc[color]} alt='community logo' />
      </a>
    </div>
  )
}

export default Logo
