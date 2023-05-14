import React, { useState } from 'react'
import { Form, message} from 'antd'
import StepCard from '../Card/StepCard'
import SurveyProgressBar from '../Survey/SurveyProgressBar'
import NoServiceForm  from './NoServiceForm'
import PrimaryButton  from '../Button/PrimaryButton'
import { noServiceSurvey } from '../../../utils/constants'
import styles from '../Survey/Survey.module.css'
import { useToolkitContext } from '../Context/ToolkitContext'

const NoServiceSurvey = () => {
  const [form] = Form.useForm()
  const [currentStep, setCurrentStep] = useState(0)
  const [surveyAnswers, setSurveyAnswers] = useState({})
  const { callUpdateMultitestSurveyResponse } = useToolkitContext()

  const handleChange = (value, field) => {
    setSurveyAnswers({ ...surveyAnswers, [field]: value })
  }

  const next =  async () => {
    setCurrentStep(currentStep + 1)
    await submitForm()
  }

  const submitForm = async () => {
    const success = await callUpdateMultitestSurveyResponse(surveyAnswers)
    if (!success) {
      message.error('Something went wrong, please try again')
    }
  }

  return (
    <div className={styles.beforeTestWrap}>
        {!(currentStep === noServiceSurvey.length - 1) &&
          <>
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
          </>
        }
        {(currentStep === noServiceSurvey.length - 1) &&
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
