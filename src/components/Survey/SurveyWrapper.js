import React, { useState } from 'react'
import StepCard from 'components/common/Card/StepCard'
import NoServiceSurvey  from 'components/common/BeforeWeBegin/NoService/NoServiceSurvey'
import AddressCard from 'components/common/BeforeWeBegin/Address/AddressCard'
import styles from './SurveyWrapper.module.css'
import Survey from 'components/common/Survey/Survey'
import { useToolkitContext } from 'components/common/Context/ToolkitContext'
import SectionContent from 'components/common/SectionContent/SectionContent'

const SurveyWrapper = () => {
  const { survey } = useToolkitContext()
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
        return (
          <div className={styles.surveyWrap}>
              <Survey 
                survey={survey} 
                onFinish={() => { setCurrentDisplay('survey-complete')}}
              />
          </div>
        )
      case 'survey-complete':
        return (
          <div className={styles.surveyWrap}>
            <StepCard 
              title='Thank you for completing the survey'
              description='We have successfully recorded your response.'
            />  
          </div>
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