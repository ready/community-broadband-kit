import React from 'react'
import moment from 'moment-timezone'

import styles from './Copyright.module.css'

const Copyright = () => {
  return (
    <div className={styles.copyright}>
      <div>
        <div>
          <span> Built with 🤍 by <a href="https://broadband.money/" target='_blank' rel='noreferrer' >Broadband Money</a></span>
        </div>
      </div>
    </div>
  )
}

export default Copyright
