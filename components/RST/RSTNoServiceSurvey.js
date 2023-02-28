import React, { useState } from 'react'
import { Form, message} from 'antd'
import { gql, useMutation } from '@apollo/client'
import { useCommunityContext } from '../context/CommunityContext'
import RSTCard from '../common/Card/RSTCard'
import SurveyProgressBar from './SurveyProgressBar'
import RSTNoServiceForm  from './RSTNoServiceForm'
import RSTButton  from './RSTButton'
import { noServiceSurvey } from '/utils/constants'

import styles from './RSTSurvey.module.css'

const RSTNoServiceSurvey = ({ config }) => {
  const [form] = Form.useForm()
  const [currentStep, setCurrentStep] = useState(0)
  const [surveyComplete, setSurveyComplete] = useState(false)
  const {
    surveyData, 
    setSurveyData,
    toolkitData,
    setToolkitData
  } = useCommunityContext()

  const handleChange = (value, field) => {
    const newSurveyData = { ...surveyData, [field]: value, organizationId: config.organizationId }
    setSurveyData(newSurveyData)
  }

  const [addMultitestData] = useMutation(ADD_MULTITEST_DATA)
  const [updateMultitestSurveyResponse] = useMutation(UPDATE_MULTITEST_SURVEY_RESPONSE)

  const next =  async () => {
    setCurrentStep(currentStep + 1)
    if (currentStep == noServiceSurvey.length - 1) {
        setSurveyComplete(true)

        const data = {
          ...toolkitData, 
          noService: true,
          organizationId: config?.organizationId
        }

        setToolkitData(data)
        console.log(data)
        //const res = await addMultitestData({ variables: {testData: data} })
    }
    await submitForm()
  }

  // handle form submission
  const submitForm = async () => {
    try {
      const res = await updateMultitestSurveyResponse({ variables: {surveyData} })
      message.destroy()
      if (res?.data?.updateMultitestSurveyResponse?.success) {
       // message.success('Success!')
      } else {
        //throw new Error(res?.data?.updateMultitestSurveyResponse?.message)
      }
    } catch (e) {
      message.error(e?.message || 'Something went wrong, please try again')
      console.error(e)
    }
  }

  return (
    <div className={styles.beforeTestWrap}>
        {!surveyComplete &&
            <>
                <RSTCard>
                    <RSTNoServiceForm
                    form={form}
                    currentStep={currentStep}
                    handleChange={handleChange}
                    />
                    <SurveyProgressBar
                    totalQuestions={noServiceSurvey?.length}
                    completedQuestions={currentStep}
                    />
                </RSTCard>
                <div className={styles.surveyButton}>
                    <RSTButton
                    buttonTitle={currentStep !== (noServiceSurvey?.length - 1)?'Next':'Finish'}
                    onClick={next}
                    />
                </div>
            </>
        }
        {surveyComplete &&
            <>
                <RSTCard title='Thank you for reporting your service status'
                        description='We have successfully recorded your response.'>  
                </RSTCard>
            </>
        }
    </div>
  )
}

export default RSTNoServiceSurvey

const UPDATE_MULTITEST_SURVEY_RESPONSE = gql`
mutation updateMultitestSurveyResponse($surveyData: MultitestSurveyResponseInput!) {
  updateMultitestSurveyResponse(data: $surveyData) {
    success
    message
  }
}
`

const ADD_MULTITEST_DATA = gql`
mutation addMultitestData($testData: MultitestDataInput!) {
  addMultitestData(data: $testData) {
    id
  }
}
`
