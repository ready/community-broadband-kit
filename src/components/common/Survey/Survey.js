import React, { useEffect, useState } from 'react'
import { Form, message} from 'antd'
import StepCard from 'components/common/Card/StepCard'
import SurveyProgressBar from './SurveyProgressBar'
import SurveyForm  from './SurveyForm'
import PrimaryButton  from 'components/common/Button/PrimaryButton'
import styles from './Survey.module.css'
import { storeAnswers } from 'utils/localStorageSurvey'
import { useToolkitContext } from 'components/common/Context/ToolkitContext'

const Survey = ({ 
  survey, 
  onFinish = () => {}
}) => {
  const [form] = Form.useForm()
  const [currentStep, setCurrentStep] = useState(0)
  const [surveyAnswers, setSurveyAnswers] = useState({})
  const [currentField, setCurrentField] = useState(null)
  const {
    metadata, 
    callUpdateMultitestSurveyResponse
  } = useToolkitContext()

  useEffect(() => {
    if (currentStep === survey?.length - 1) {
      onFinish()
    }
  }, [currentStep])

  const handleChange = (value, field) => {
    if ((field === 'usesInternetForSchool' || field === 'hasTroublePaying' || field === 'wouldUseCredit') && value === 'Yes') {
      value = true 
    } else if ((field === 'usesInternetForSchool' || field === 'hasTroublePaying' || field === 'wouldUseCredit') && value === 'No') {
      value = false
    }
    setCurrentField(field)
    setSurveyAnswers({ ...surveyAnswers, [field]: value })
  }

  const next =  async () => {
    setCurrentStep(currentStep + 1)
    await submitForm()
  }

  const submitForm = async () => {
    if (currentField === null) return

    const success = await callUpdateMultitestSurveyResponse(surveyAnswers)
    if (success) {
      storeAnswers(Object.keys(surveyAnswers), metadata?.ipAddress)
    } else {
      message.error('Something went wrong, please try again')
    }
    setCurrentField(null)
  }

  return (
    <>
      <StepCard>
        <SurveyForm
          survey={survey}
          form={form}
          currentStep={currentStep}
          handleChange={handleChange}
        />
        <SurveyProgressBar
          totalQuestions={survey?.length}
          completedQuestions={currentStep}
        />
      </StepCard>
      <div className={styles.surveyButton}>
        <PrimaryButton
          buttonTitle={currentStep !== (survey?.length - 1) ? 'Next' : 'Finish'}
          onClick={next}
        />
      </div>
    </>
  )
}

export default Survey