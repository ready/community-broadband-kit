import React from 'react'
import Copyright from '../Copyright/Copyright'
import styles from './FooterBottom.module.css'
import { useAppContext } from 'components/common/Context/AppContext'
import Logo from 'components/common/Layout/Logo/Logo'

const FooterBottom = () => {
  const { config } = useAppContext()
  
  return (
    <div className={styles.footerBottom}>
      <Logo src={config?.logo}/>
      {config?.showBbmReferences && <Copyright />}
    </div>
  )
}

export default FooterBottom
