import React from 'react'
import { Radio } from 'antd'

import styles from './ChecklistAnswerOption.module.css'

const ChecklistAnswerOption = ({ imgSrc, imgAlt, optionText, optionValue }) => {
  return (
    <Radio.Button
      value={optionValue}
      className={styles.checklistAnswerOption}
    >
      <img
        className={styles.checklistIcon}
        src={imgSrc}
        // width='32px'
        // height='32px'
        alt={imgAlt}
      />
      <p className={styles.iconText}>{optionText}</p>
    </Radio.Button>
  )
}

export default ChecklistAnswerOption
