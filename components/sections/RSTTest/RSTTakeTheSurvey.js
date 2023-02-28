import React, { useState } from 'react'
import { Form, message, Checkbox} from 'antd'
import { gql, useMutation } from '@apollo/client'
import { useCommunityContext } from '../../context/CommunityContext'
import { survey } from '/utils/constants'
import Header from '../../common/Header/Header'
import RSTCard from '../../common/Card/RSTCard'
import SurveyProgressBar from '../../RST/SurveyProgressBar'
import RSTTakeTheSurveyForm  from '../../RST/RSTTakeTheSurveyForm'
import RSTNoServiceSurvey  from '../../RST/RSTNoServiceSurvey'
import RSTButton  from '../../RST/RSTButton'
import SectionRightContent from '../../common/SectionContent/SectionRightContent'
import AddressAutoComplete from '../../RST/AddressAutoComplete'
import PhoneNumberEntry from '../../RST/PhoneNumberEntry'

import styles from './RSTTakeTheSurvey.module.css'

const RSTTakeTheSurvey = ({ config }) => {
    const [form] = Form.useForm()
    const [currentStep, setCurrentStep] = useState(0)
    const [surveyComplete, setSurveyComplete] = useState(false)
    const [enterAddress, setEnterAddress] = useState(false)
    const [enterPhoneNumber, setEnterPhoneNumber] = useState(false)
    const [noService, setNoService] = useState(false)
  
    const {
      surveyData, 
      setSurveyData,
      toolkitData,
      setToolkitData
    } = useCommunityContext()
  
    async function submitAddress(){
      setEnterAddress(true)
      if (toolkitData.noService == true) {
        setNoService(true)
      }
    }
  
    async function submitPhoneNumber(){
      setEnterPhoneNumber(true)
    }
  
    const handleChange = (value, field) => {
      if ((field === 'usesInternetForSchool' || field === 'hasTroublePaying' || field === 'wouldUseCredit') && value === 'Yes') {
        value = true 
      } else if ((field === 'usesInternetForSchool' || field === 'hasTroublePaying' || field === 'wouldUseCredit') && value === 'No') {
        value = false
      }
      
      const newSurveyData = { ...surveyData, [field]: value, organizationId: config.organizationId }
      setSurveyData(newSurveyData)
    }
  
    const [updateMultitestSurveyResponse] = useMutation(UPDATE_MULTITEST_SURVEY_RESPONSE)
  
    const next =  async () => {
      setCurrentStep(currentStep + 1)
      if (currentStep == survey.length - 1) {
          setSurveyComplete(true)
      }
      await submitForm()
    }
  
    // handle survey form submission
    const submitForm = async () => {
      try {
        const res = await updateMultitestSurveyResponse({ variables: {surveyData} })
        message.destroy()
        if (res?.data?.updateMultitestSurveyResponse?.success) {
          // message.success('Success!')
        } else {
         // throw new Error(res?.data?.updateMultitestSurveyResponse?.message)
        }
      } catch (e) {
        message.error(e?.message || 'Something went wrong, please try again')
        console.error(e)
      }
    }
  
    return (
  
      <section className={styles.test}>
        <Header config={config} logoColor='white' hero page='broadband-audits' />
          
            {!enterAddress &&
              <div className={styles.beforeSurveyWrap}>
                <RSTCard
                  title='Before We Begin...'
                  description='Your location is required to help Mississippi get better internet. Please enter your address below. It will not be shared with the public.'
                >
                  <AddressAutoComplete config={config}/>
                  <p className={styles.beforeSurveyDescription}>
                    If you are reporting that you have no internet at home from a different location, enter in your home address and select the option below.
                  </p>
                  <Checkbox
                    className={styles.checkInternet}
                    onChange={(e) => setToolkitData({...toolkitData, noService: e.target.checked, organizationId: config.organizationId})
                  }
                  >
                    I do not have internet service at this address
                  </Checkbox>
                  <div className={styles.beforeSurveyButtonWrap}>
                    <RSTButton
                      buttonTitle='Next'
                      onClick={() => submitAddress()}
                      disabled={ !toolkitData.address && config?.isAddressRequired }
                    />
                  </div>
                </RSTCard>
              </div>}
              
            {noService && 
              <div className={styles.surveyWrap}>
                <SectionRightContent>
                  <RSTNoServiceSurvey />
                </SectionRightContent> 
              </div>}
  
            {!surveyComplete && enterAddress && !noService && !enterPhoneNumber &&
              <div className={styles.surveyWrap}>
                <RSTCard 
                  title='Before We Begin...'
                  description='Please enter your phone number and have information about the internet speeds you are subscribed to in order to complete the following survey questions.'
                  >
                  <PhoneNumberEntry/>
                </RSTCard>
                <div className={styles.surveyButton}>
                  <RSTButton
                  buttonTitle={'Start'}
                  onClick={() => submitPhoneNumber()}
                  disabled={!surveyData.phoneNumber}
                  />
                </div> 
              </div>
            }
  
          
            {!surveyComplete && enterAddress && !noService && enterPhoneNumber &&
              <div className={styles.surveyWrap}>
                <RSTCard>
                  <RSTTakeTheSurveyForm 
                  form={form}
                  currentStep={currentStep}
                  handleChange={handleChange}
                  />
                  <SurveyProgressBar
                  totalQuestions={survey?.length}
                  completedQuestions={currentStep}
                  />
                </RSTCard>
                <div className={styles.surveyButton}>
                  <RSTButton
                  buttonTitle={currentStep !== (survey?.length - 1)?'Next':'Finish'}
                  onClick={next}
                  />
                </div> 
              </div>
            }
  
            {surveyComplete &&
              <div className={styles.surveyWrap}>
                <RSTCard title='Thank you for completing the survey'
                        description='We have successfully recorded your response.'>  
                </RSTCard>
              </div>
            }
        </section>
      
    )
  }
  
  export default RSTTakeTheSurvey
  
  const UPDATE_MULTITEST_SURVEY_RESPONSE = gql`
  mutation updateMultitestSurveyResponse($surveyData: MultitestSurveyResponseInput!) {
    updateMultitestSurveyResponse(data: $surveyData) {
      success
      message
    }
  }
  `
  