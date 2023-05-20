import React from 'react'
import StepCard from 'components/common/Card/StepCard'
import PhoneNumberEntry from './PhoneNumberEntry'
import PrimaryButton from 'components/common/Button/PrimaryButton'
import { useToolkitContext } from 'components/common/Context/ToolkitContext'
import styles from './PhoneNumberCard.module.css'

const PhoneNumberCard = ({ onClick }) => { 
  const { metadata } = useToolkitContext()
  return (
    <div className={styles.surveyWrap}>
      <StepCard 
        title='Before We Begin...'
        description='Please enter your phone number and have information about the internet speeds you are subscribed to in order to complete the following survey questions.'
      >
        <PhoneNumberEntry/>
      </StepCard>
      <div className={styles.surveyButton}>
        <PrimaryButton
          buttonTitle={'Start'}
          onClick={onClick}
          disabled={!metadata?.phoneNumber}
        />
      </div> 
    </div>
  )
}

export default PhoneNumberCard