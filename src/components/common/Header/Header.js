import React from 'react'
import Logo from '../Logo/Logo'
import NavLinks from '../NavLinks/NavLinks'
import styles from './Header.module.css'
import { useCommunityContext } from '../../context/CommunityContext'

const Header = ({ logoColor, hero, page, title, mapHeader = false }) => {
  const { config } = useCommunityContext()

  const getTitleColor = (page) => {
    switch (page) {
      case 'rec':
        return 'var(--color-green-1)'
      case 'tribal':
        return 'var(--color-gray-0)'
      case 'survey':
        return 'var(--color-gray-0)'
    }
  }

  return (
    <div
      className={`${styles.header} ${hero ? styles.heroHeader : ''} ${mapHeader ? styles.mapHeader : styles.commonHeader}`}
      style={{ marginBottom: page === 'howItWorks' ? '72px' : '0' }}
    >
      {mapHeader
        ? (
          <div className={styles.mapHeaderInnerContain}>
            <Logo />
            {hero && <NavLinks page={page} mapHeader={mapHeader} />}
          </div>)
        : (
          <>
            {title
              ? (
                <h2 className={styles.RECReportTitle} style={{ color: getTitleColor(page) }}>
                  {title}
                </h2>)
              : <Logo />}
            {hero && <NavLinks page={page} mapHeader={mapHeader} logoColor={logoColor} />}
          </>)}
    </div>
  )
}

export default Header
