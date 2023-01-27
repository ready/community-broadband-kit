import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu } from 'antd'

import { useEnableScroll } from '../../context/ScrollContext'

import styles from './NavLinks.module.css'

const CommunityMenu = ({ mode, logoColor }) => {
  const [scroll, setScroll] = useEnableScroll()
  const [isMobileScreen, setIsMobileScreen] = useState(false)
  const [isMediumSmallScreen, setIsMediumSmallScreen] = useState(false)
  const handleResize = () => {
    if (window.innerWidth < 828) {
      setIsMobileScreen(true)
      setIsMediumSmallScreen(false)
    } else if (window.innerWidth < 1200) {
      setIsMobileScreen(false)
      setIsMediumSmallScreen(true)
    } else {
      setIsMobileScreen(false)
      setIsMediumSmallScreen(false)
    }
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
  }, [])

  const handleClick = (e) => {
    e.preventDefault()
    setScroll(true)
  }

  return (
    <nav className={`${styles.nav} ${styles[`${logoColor}Links`]}`}>
      <Menu
        mode={isMediumSmallScreen || isMobileScreen ? 'vertical' : mode}
        className={styles.menuContainer}
      >
        <Menu.Item
          key='setting:1'
        >
          
            <a href='#' onClick={(e) => handleClick(e)}><b>What's this</b></a>
          
        </Menu.Item>
        <Menu.Item
          key='setting:2'
        >
          <Link href='/history'>
            <a><b>History</b></a>
          </Link>
        </Menu.Item>
        <Menu.Item
          key=''
        >
          <Link href='https://broadband.money/community-broadband-kit'>
            <a><b>Get Your Own</b></a>
          </Link>
        </Menu.Item>
      </Menu>
      <div className={styles.iconLinkTwitter}>
            <a
              href='https://twitter.com/broadbandmoney'
              target='_blank'
              rel='noreferrer'
            >
              <img
                src='/icons/twitter-solid.svg'
                height={22}
                width={22}
                alt='broadband.money twitter link'
              />
            </a>
          </div>
          <div className={styles.iconLinkLinkedIn}>
            <a
              href='https://www.linkedin.com/company/broadbandmoney'
              target='_blank'
              rel='noreferrer'
            >
              <img
                src='/icons/linkedin-3.svg'
                height={17}
                width={17}
                alt='broadband.money linkedin link'
              />
            </a>
          </div>
    </nav>
  )
}

export default CommunityMenu
