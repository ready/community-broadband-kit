import React from 'react'
import Copyright from '../Copyright/Copyright'
import styles from './FooterBottom.module.css'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../../../common/Context/AppContext'

const FooterBottom = () => {
  const navigate = useNavigate()
  const { config } = useAppContext()
  
  return (
    <div className={styles.footerBottom}>
      <div className={styles.logo} onClick={()=>navigate('/')}>
        <img src={config.logo} alt='community logo' />
      </div>
      {config.showBbmReferences && <Copyright />}
    </div>
  )
}

export default FooterBottom
