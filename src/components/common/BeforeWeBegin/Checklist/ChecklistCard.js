import React, { useState } from 'react'
import { Steps } from 'antd'
import StepCard from 'components/common/Card/StepCard'
import ChecklistContent from './ChecklistContent'
import PrimaryButton from 'components/common/Button/PrimaryButton'
import styles from './ChecklistCard.module.css'

const ChecklistCard = ({ onClick }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const checklist = ['internet', 'vpn', 'interruption', 'information']
  const items = checklist?.map((item) => ({
    key: item.content,
  }))

  const next = () => {
    setCurrentStep(currentStep + 1)
  }
  
  return (
    <StepCard
      title='Before We Begin...'
      description='For best results, we recommend taking the following currentSteps. Please select a currentStep if it has been done. Hover over underlined terms for additional information.'
    >
      <Steps className={styles.beforeTestSteps} current={currentStep} items={items} responsive={false} />
      <ChecklistContent
        currentChecklist={checklist[currentStep]}
      />
      <div className={styles.beforeTestButtonWrap}>
        <PrimaryButton
          buttonTitle={currentStep === Object.keys(checklist)?.length - 1 ? 'Start test' : 'Next'}
          onClick={
            (currentStep === checklist?.length - 1) 
            ? () => onClick() 
            : () => next()
          }
        />
      </div>
    </StepCard>
  )
}

export default ChecklistCard