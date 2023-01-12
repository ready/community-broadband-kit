import React from 'react'

import SurveyFormItem from './SurveyFormItem'

import styles from './SurveyStepper.module.css'

const SurveyStepper = ({ steps, currentStep }) => {
  return (
    <div className={styles.survey}>
      {steps?.[currentStep]?.type === 'nested'
        ? (
          <div className={styles.nested}>
            <p>{steps?.[currentStep]?.question}</p>
            {steps?.[currentStep]?.subquestions?.map((subquestion, id) => (
              <SurveyFormItem key={id} question={subquestion} />
            ))}
          </div>
        )
        : <SurveyFormItem question={steps?.[currentStep]} />
      }
    </div>
  )
}

export default SurveyStepper