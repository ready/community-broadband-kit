import React from 'react'
import moment from 'moment-timezone'

import styles from './Copyright.module.css'

const Copyright = () => {
  return (
    <div className={styles.copyright}>
      {/* <div className={styles.address}>
        1717 K Street, Suite 900
        <div>Washington DC 20006</div>
      </div> */}
      <div>
        <div>
          {/* <span>Built with &nbsp;🤍 &nbsp;by Ready</span> */}
          <span> {'© ' + moment().year() + ' Mississippi '}</span>
        </div>
       
      </div>
    </div>
  )
}

export default Copyright
