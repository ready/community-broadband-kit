import React from 'react'
import Logo from '../Logo/Logo'
import NavLinks from './NavLinks/NavLinks'
import styles from './Header.module.css'
import { useAppContext } from '../../Context/AppContext'

const Header = () => {
  const { config } = useAppContext()
  return (
    <div
      className={styles.header}
    >
      <Logo src={config?.logo}/>
      <NavLinks />
    </div>
  )
}

export default Header
