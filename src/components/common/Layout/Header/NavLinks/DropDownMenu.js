import { useState } from 'react'
import styles from './DropDownMenu.module.css'
import CommunityMenu from './CommunityMenu'

const DropDownMenu = ({ openMenu }) => {
  return (
    <div
      className={`${styles.dropDownMenu} ${openMenu && isMobileScreen ? styles.openMenu : ''}`}
    >
      <CommunityMenu mode='vertical' isMobileScreen={isMobileScreen} />
    </div>
  )
}

export default DropDownMenu
