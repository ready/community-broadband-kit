import React from 'react'
import { Tooltip } from 'antd'

import styles from './RSTTooltip.module.css'

const RSTTooltip = ({ tooltipKeyword, tooltipText }) => {
  return (
    <div>
      <Tooltip placement='top' title={tooltipText} overlayClassName={styles.tooltip}>
        {tooltipKeyword}
      </Tooltip>
    </div>
  )
}

export default RSTTooltip
