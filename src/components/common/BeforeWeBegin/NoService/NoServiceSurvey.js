import React, { useState } from 'react'
import { Form, message} from 'antd'
import StepCard from 'components/common/Card/StepCard'
import SurveyProgressBar from 'components/common/Survey/SurveyProgressBar'
import NoServiceForm  from './NoServiceForm'
import PrimaryButton  from 'components/common/Button/PrimaryButton'
import { noServiceSurvey } from 'utils/constants'
import { useToolkitContext } from 'components/common/Context/ToolkitContext'
import styles from './NoServiceSurvey.module.css'

const NoServiceSurvey = () => {
  const [form] = Form.useForm()
  const [currentStep, setCurrentStep] = useState(0)
  const [surveyAnswers, setSurveyAnswers] = useState({})
  const { callUpdateMultitestSurveyResponse } = useToolkitContext()
  const [surveyComplete, setSurveyComplete] = useState(false)

  const handleChange = (value, field) => {
    setSurveyAnswers({ ...surveyAnswers, [field]: value })
  }

  const next =  async () => {
    setCurrentStep(currentStep + 1)
    if (currentStep === noServiceSurvey.length - 1) {
      setSurveyComplete(true)
    }
    await submitForm()
  }

  const submitForm = async () => {
    const success = await callUpdateMultitestSurveyResponse(surveyAnswers)
    if (!success) {
      message.error('Something went wrong, please try again')
    }
  }

  return (
    <div className={styles.surveyWrap}>
        {!surveyComplete &&
          <>
            <div className={styles.stepCard}>
              <StepCard>
                <NoServiceForm
                  form={form}
                  currentStep={currentStep}
                  handleChange={handleChange}
                />
                <SurveyProgressBar
                  totalQuestions={noServiceSurvey?.length}
                  completedQuestions={currentStep}
                />
              </StepCard>
              <div className={styles.surveyButton}>
                <PrimaryButton
                  buttonTitle={currentStep !== (noServiceSurvey?.length - 1) ? 'Next' : 'Finish'}
                  onClick={next}
                />
              </div>
            </div>
          </>
        }
        {surveyComplete &&
          <>
            <StepCard 
              title='Thank you for reporting your service status'
              description='We have successfully recorded your response.'
            >  
            </StepCard>
          </>
        }
    </div>
  )
}

export default NoServiceSurvey
