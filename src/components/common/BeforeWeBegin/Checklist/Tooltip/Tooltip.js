import React from 'react'
import { Tooltip } from 'antd'

import styles from './Tooltip.module.css'

const ChecklistTooltip = ({ tooltipKeyword, tooltipText }) => {
  return (
    <div>
      <Tooltip placement='top' title={tooltipText} overlayClassName={styles.tooltip}>
        {tooltipKeyword}
      </Tooltip>
    </div>
  )
}

export default ChecklistTooltip
