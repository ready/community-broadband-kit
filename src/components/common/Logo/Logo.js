import React from 'react'
import { useLocation } from 'react-router-dom'
import styles from './Logo.module.css'
import { useCommunityContext } from '../../context/CommunityContext'

const Logo = ({ className }) => {
  const location = useLocation()
  const pathname = location?.pathname
  const { config } = useCommunityContext()

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
        <img src={config?.logo} alt='community logo' />
      </a>
    </div>
  )
}

export default Logo
