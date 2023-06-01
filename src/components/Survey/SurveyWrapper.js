import React, { useState } from 'react'
import StepCard from 'components/common/Card/StepCard'
import NoServiceSurvey  from 'components/common/BeforeWeBegin/NoService/NoServiceSurvey'
import AddressCard from 'components/common/BeforeWeBegin/Address/AddressCard'
import styles from './SurveyWrapper.module.css'
import PhoneNumberCard from 'components/common/BeforeWeBegin/PhoneNumber/PhoneNumberCard'
import Survey from 'components/common/Survey/Survey'

const SurveyWrapper = () => {
  const [currentDisplay, setCurrentDisplay] = useState('address-input')

  const renderSection = () => {
    switch (currentDisplay) {
      case 'address-input':
        return <AddressCard onClick={(noService) => { 
          noService ? setCurrentDisplay('no-service') : setCurrentDisplay('survey')
        }}/>
      case 'no-service':
        return <NoServiceSurvey />
      case 'survey':
        return <Survey onFinish={() => { setCurrentDisplay('survey-complete')}}/>
      case 'survey-complete':
        return (
          <StepCard 
            title='Thank you for completing the survey'
            description='We have successfully recorded your response.'
          />  
        )
      default:
        return <></>
    }
  }

  return (
    <section className={styles.container}>
      {renderSection()}
    </section>   
  )
}

export default SurveyWrapper