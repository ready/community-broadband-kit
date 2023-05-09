import React from 'react'
import { Progress } from 'antd'

import styles from './SurveyProgressBar.module.css'

const SurveyProgressBar = ({ totalQuestions, completedQuestions }) => {
  return (
    <div className={styles.surveyProgressBar}>
      <p className={styles.progressNum}>
        {completedQuestions} / {totalQuestions}
      </p>
      <Progress
        percent={(completedQuestions / totalQuestions * 100).toFixed(0)}
        showInfo={false}
        status='normal'
        className={styles.lineProgress}
      />
    </div>
  )
}

export default SurveyProgressBar
