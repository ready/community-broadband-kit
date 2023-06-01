import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { FaExternalLinkAlt } from "react-icons/fa"
import styles from './NavLinks.module.css'
import { useAppContext } from 'components/common/Context/AppContext'
import HeaderShareButtons from './HeaderShareButtons'

const CommunityMenu = ({ mode, logoColor }) => {
  const [isMobileScreen, setIsMobileScreen] = useState(false)
  const [isMediumSmallScreen, setIsMediumSmallScreen] = useState(false)

  const { config } = useAppContext()

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

  return (
    <nav className={`${styles.nav} ${styles[`${logoColor}Links`]}`}>
      <Menu
        mode={isMobileScreen ? 'vertical' : mode}
        className={styles.menuContainer}
      >
        <Menu.Item
          key='setting:1'
        >
          <Link to='/#info'>
            <b>What's This</b>
          </Link>
        </Menu.Item>
        {config?.showHistory && 
          <Menu.Item
            key='setting:2'
          >
            <Link to='/history'>
              <b>History</b>
            </Link>
          </Menu.Item>}
        {config?.showBbmReferences && 
          <Menu.Item
            key=''
          >
            <Link to='https://broadband.money/community-broadband-kit'>
              <FaExternalLinkAlt></FaExternalLinkAlt><b> Get Your Own</b>
            </Link>
          </Menu.Item>}
      </Menu>
      {!isMobileScreen &&
      <HeaderShareButtons /> }
    </nav>
  )
}

export default CommunityMenu
