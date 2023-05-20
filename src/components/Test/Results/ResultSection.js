import React from 'react'
import SectionContent from 'components/common/SectionContent/SectionContent'
import SectionLeftContent from 'components/common/SectionContent/SectionLeftContent'
import SectionRightContent from 'components/common/SectionContent/SectionRightContent'
import SectionBlurb from 'components/common/SectionBlurb/SectionBlurb'
import StepCard from 'components/common/Card/StepCard'
import Result from 'components/common/Result/Result'
import PrimaryButton from 'components/common/Button/PrimaryButton'
import EmailReminder from './EmailReminder/EmailReminder'
import ServiceStatusTag from 'components/common/Result/Tags/ServiceStatusTag'
import ShareButtons from './ShareButtons'
import styles from './ResultSection.module.css'
import getServiceStatus from 'utils/getServiceStatus'
import { useToolkitContext } from 'components/common/Context/ToolkitContext'

const ResultSection = ({ setCurrentDisplay, testData }) => {
  const { config } = useToolkitContext()
  const serviceStatus = getServiceStatus(testData)

  const handleStartTest = () => {
    setCurrentDisplay('same-setup')
  }

  return (
    <div className={styles.resultSection}>
      <SectionContent>
        <SectionLeftContent>
          <SectionBlurb
            title='Thank you!'
            section='hero'
          >
            <p>Here are your results. If you weren&apos;t able to complete the survey, please take the test again.</p>
            
            {config?.showEmailReminder &&
              <>
                <p>For best results, take the test once per day for the next 7 days.
                <br />
                
                Enter your email below to receive a reminder:</p>
                <EmailReminder/>
              </>}
          </SectionBlurb>
        </SectionLeftContent>
        <SectionRightContent>
          {config?.resultShareButtons && <ShareButtons />}
          <StepCard
            title={<>You are <ServiceStatusTag size='big' serviceStatus={serviceStatus?.serviceStatusText} /></>}
            description='Following NTIA grant guidelines, reliable broadband connections should have at least 100 Mbps download and 20 Mbps upload.'
          >
            <Result
              results={testData}
              serviceStatus={serviceStatus}
            />
          </StepCard>
          <PrimaryButton
            buttonTitle='Test again'
            onClick={handleStartTest}
          />
        </SectionRightContent>
      </SectionContent>
    </div>
  )
}

export default ResultSection
