import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu } from 'antd'
import { FaExternalLinkAlt } from "react-icons/fa"
import { useRouter } from 'next/router'
import { useEnableScroll } from '../../context/ScrollContext'
import ternary from '/utils/ternary'
import styles from './NavLinks.module.css'

const CommunityMenu = ({ mode, logoColor, config }) => {
  const [scroll, setScroll] = useEnableScroll()
  const [isMobileScreen, setIsMobileScreen] = useState(false)
  const [isMediumSmallScreen, setIsMediumSmallScreen] = useState(false)
  const [testUrl, setTestUrl] = useState('')
  const router = useRouter()
  const pathname = router.pathname
  const whatsThisLink = pathname !== '/'

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
    setTestUrl(`${window.location.origin}`)
  }, [])

  const handleClick = (e) => {
    e.preventDefault()
    setScroll(true)
  }

  const postTitle = 'Help our community in winning broadband grants by taking this internet speed test'

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
            <Link href='/#info'>
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
            <Link href='/history'>
              <a><b>History</b></a>
            </Link>
          </Menu.Item>}
        {config?.showBbmReferences && 
          <Menu.Item
            key=''
          >
            <Link href='https://broadband.money/community-broadband-kit'>
              <a><FaExternalLinkAlt></FaExternalLinkAlt><b> Get Your Own</b></a>
            </Link>
          </Menu.Item>}
      </Menu>
          <div className={styles.iconLinkTwitter}>
              <a
                href={`https://twitter.com/share?url=${testUrl}&text=${postTitle}`}
                target='_blank'
                rel='noreferrer'
              >
                <img
                  src='/icons/twitter-2.svg'
                  height={22}
                  width={22}
                  alt='community toolkit twitter link'
                />
              </a>
          </div>
          <div className={styles.iconLinkLinkedIn}>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${testUrl}`}
              target='_blank'
              rel='noreferrer'
            >
              <img
                src='/icons/linkedin-2.svg'
                height={19}
                width={19}
                alt='community toolkit linkedin link'
                style={{ fill: 'red' }}
              />
            </a>
          </div>
          <div className={styles.iconLinkFacebook}>
            <a
              href={`https://www.facebook.com/sharer.php?u=${testUrl}`}
              target='_blank'
              rel='noreferrer'
            >
              <img
                src='/icons/facebook-2.svg'
                height={22}
                width={22}
                alt='community toolkit facebook link'
              />
            </a>
          </div>
          <div className={styles.iconLinkEmail}>
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=${postTitle}&body=${testUrl}+&ui=2&tf=1&pli=1`}
              target='_blank'
              rel='noreferrer'
            >
              <img
                src='/icons/mail.svg'
                height={18}
                width={18}
                alt='community toolkit email link'
              />
            </a>
          </div>
    </nav>
  )
}

export default CommunityMenu
