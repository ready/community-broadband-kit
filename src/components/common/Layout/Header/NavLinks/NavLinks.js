import React, { useRef } from 'react'
import CommunityMenu from './CommunityMenu'
import TranslateSelector from '../Translate/TranslateSelector'
import styles from './NavLinks.module.css'

const NavLinks = ({ logoColor }) => {
  const node = useRef()

  return (
    <div className={styles.container}>
      <div
        ref={node}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        {/* <HamburgerButton
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          page={page}
        />
        <DropDownMenu openMenu={openMenu} setOpenMenu={setOpenMenu} /> */}
      </div>
      <div className={styles.navMenu}>
        <TranslateSelector />
        <CommunityMenu mode='horizontal' logoColor={logoColor} />
      </div>
    </div>
  )
}

export default NavLinks
