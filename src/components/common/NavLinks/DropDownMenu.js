import { useState } from 'react'
import styles from './DropDownMenu.module.css'
import CommunityMenu from './CommunityMenu'

const DropDownMenu = ({ openMenu }) => {
  const [isMobileScreen] = useState(false)
  // const handleResize = () => {
  //   if (window.innerWidth < 662) {
  //     setIsMobileScreen(true)
  //   } else {
  //     setIsMobileScreen(false)
  //     setOpenMenu(false)
  //   }
  // }

  // useEffect(() => {
  //   handleResize()
  //   window.addEventListener('resize', handleResize)
  // }, [])

  return (
    <div
      className={`${styles.dropDownMenu} ${openMenu && isMobileScreen ? styles.openMenu : ''}`}
    >
      <CommunityMenu mode='vertical' isMobileScreen={isMobileScreen} />
    </div>
  )
}

export default DropDownMenu
