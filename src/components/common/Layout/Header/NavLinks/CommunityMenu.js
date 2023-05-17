import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { FaExternalLinkAlt } from "react-icons/fa"
import { useEnableScroll } from '../../../Context/ScrollContext'
import ternary from '../../../../../utils/ternary'
import styles from './NavLinks.module.css'
import { useAppContext } from '../../../Context/AppContext'
import HeaderShareButtons from './HeaderShareButtons'

const CommunityMenu = ({ mode, logoColor }) => {
  const [scroll, setScroll] = useEnableScroll()
  const [isMobileScreen, setIsMobileScreen] = useState(false)
  const [isMediumSmallScreen, setIsMediumSmallScreen] = useState(false)
  const location = useLocation()
  const pathname = location?.pathname
  const whatsThisLink = pathname !== '/'
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
        {ternary(whatsThisLink, 
          <Menu.Item
          key='setting:1'
          >
            <Link to='/#info'>
              <a><b>What's This</b></a>
            </Link>
          </Menu.Item>,
          <Menu.Item
          key='setting:1'
          >
            <a href='#' onClick={(e) => handleClick(e)}><b>What's this</b></a>
          </Menu.Item>
        )}
        {config?.showHistory && 
          <Menu.Item
            key='setting:2'
          >
            <Link to='/history'>
              <a><b>History</b></a>
            </Link>
          </Menu.Item>}
        {config?.showBbmReferences && 
          <Menu.Item
            key=''
          >
            <Link to='https://broadband.money/community-broadband-kit'>
              <a><FaExternalLinkAlt></FaExternalLinkAlt><b> Get Your Own</b></a>
            </Link>
          </Menu.Item>}
      </Menu>
      {!isMobileScreen &&
      <HeaderShareButtons /> }
    </nav>
  )
}

export default CommunityMenu
