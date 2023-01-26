import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'

import HamburgerButton from './HamburgerButton'
import DropDownMenu from './DropDownMenu'
import CommunityMenu from './CommunityMenu'
import TranslateSelector from '/components/common/Translate/TranslateSelector'
import styles from './NavLinks.module.css'

const NavLinks = ({ logoColor }) => {
  const router = useRouter()
  const pathname = router.pathname

  const [openMenu, setOpenMenu] = useState(false)
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
