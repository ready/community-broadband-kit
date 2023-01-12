import React, { useState } from 'react'
import { Form, message} from 'antd'
import { gql, useMutation } from '@apollo/client'
import { useCommunityContext } from '../context/CommunityContext'
import RSTCard from '../common/Card/RSTCard'
import SurveyProgressBar from './SurveyProgressBar'
import RSTForm  from './RSTForm'
import RSTButton  from './RSTButton'

import styles from './RSTSurvey.module.css'

const RSTSurvey = () => {
  const [form] = Form.useForm()
  const [currentStep, setCurrentStep] = useState(0)
 
  const {
    surveyData, 
    setSurveyData,
    testSurvey,
    toolkitData,
    setSurveyComplete
  } = useCommunityContext()

  const [answeredFields, setAnsweredFields] = useState([])
  const [surveyAttribute, setSurveyAttribute]  = useState('')

  const handleChange = (value, field) => {
    if ((field === 'usesInternetForSchool' || field === 'hasTroublePaying' || field === 'wouldUseCredit') && value === 'Yes') {
      value = true 
    } else if ((field === 'usesInternetForSchool' || field === 'hasTroublePaying' || field === 'wouldUseCredit') && value === 'No') {
      value = false
    }

    const newSurveyData = { ...surveyData, [field]: value }
    setSurveyAttribute(field)
    setSurveyData(newSurveyData)
  }
  const next =  async () => {
    setCurrentStep(currentStep + 1)
    if (currentStep == testSurvey.length - 1) {
      setSurveyComplete(true)
    }
    await submitForm()
  }
  const [updateMultitestSurveyResponse] = useMutation(UPDATE_MULTITEST_SURVEY_RESPONSE)

  // handle form submission
  const submitForm = async () => {
    try {
      //console.log(surveyData)
      const res = await updateMultitestSurveyResponse({ variables: {surveyData} })
      message.destroy()
      if (res?.data?.updateMultitestSurveyResponse?.success) {
        // message.success('Success!')

        // Save field/survey attribute to Local Storage for the ip address
        answeredFields.push(surveyAttribute)
        let answeredQsArray = JSON.parse(localStorage.getItem('answeredQs'))
        let ipExistsFlag

        // If answeredQs array doesn't exist in Local Storage (first time taking the survey), create new ip address object
        if (answeredQsArray === null) {
            localStorage.setItem('answeredQs', JSON.stringify([{ipAddress: toolkitData.ipAddress, answered: answeredFields}]))
        } 
        // Otherwise loop thru answeredQs array and update the proper object depending on ip address
        else {
          for (let i = 0; i < answeredQsArray.length; i++) {
              if (answeredQsArray[i].ipAddress === toolkitData.ipAddress) {
                  answeredQsArray[i].answered = [...answeredQsArray[i].answered, surveyAttribute]
                  ipExistsFlag = true
              }
          }
          // If ip address doesn't yet exist in the answeredQs array, create new obj for it
          if (!ipExistsFlag) {
              answeredQsArray.push({ipAddress: toolkitData.ipAddress, answered: answeredFields})
          }
          // Update existing answeredQs array in local storage
          localStorage.setItem('answeredQs', JSON.stringify(answeredQsArray))
        }

      } else {
        // throw new Error(res?.data?.updateMultitestSurveyResponse?.message)
      }
    } catch (e) {
      message.error(e?.message || 'Something went wrong, please try again')
      console.error(e)
    }
  }

  return (
    <>
      <RSTCard>
        <RSTForm
          form={form}
          currentStep={currentStep}
          handleChange={handleChange}
        />
        <SurveyProgressBar
          totalQuestions={testSurvey?.length}
          completedQuestions={currentStep}
        />
      </RSTCard>
      <div className={styles.surveyButton}>
        <RSTButton
          buttonTitle={currentStep !== (testSurvey?.length - 1) ? 'Next' : 'Finish'}
          onClick={next}
        />
      </div>
    </>
  )
}

export default RSTSurvey

const UPDATE_MULTITEST_SURVEY_RESPONSE = gql`
mutation updateMultitestSurveyResponse($surveyData: MultitestSurveyResponseInput!) {
  updateMultitestSurveyResponse(data: $surveyData) {
    success
    message
  }
}
`