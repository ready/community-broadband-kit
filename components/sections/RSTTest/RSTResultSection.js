import React, { useEffect, useState } from 'react'

import SectionContent from '../../common/SectionContent/SectionContent'
import SectionLeftContent from '../../common/SectionContent/SectionLeftContent'
import SectionRightContent from '../../common/SectionContent/SectionRightContent'
import SectionBlurb from '../../common/SectionBlurb/SectionBlurb'
import RSTCard from '../../common/Card/RSTCard'
import Result from '../../RST/Result'
import RSTButton from '../../RST/RSTButton'
import EmailReminder from '../../RST/EmailReminder'
import ServiceStatusTag from '../../RST/ServiceStatusTag'
import { useCommunityContext } from '../../context/CommunityContext'

import styles from './RSTResultSection.module.css'

const RSTResultSection = () => {
  const { startTest, setStartTest, toolkitData, setRunTest, setShowResult } = useCommunityContext()
  const [resultsFields, setResultsFields] = useState()

  const handleStartTest = () => {
    setStartTest(!startTest)
    setRunTest(false)
    setShowResult(false)
  }

  useEffect(() => {
    fetch('/api/getResultsFields', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        results: toolkitData
      })
    })
    .then(res => res.json())
    .then(fields => setResultsFields(fields))
    .catch((error) => {
       console.log(error)
    })
  }, [])

  return (
    <div className={styles.resultSection}>
      <SectionContent>
        <SectionLeftContent>
          <SectionBlurb
            title='Thank you!'
            section='hero'
          >
            <p>Here are your results. If you weren&apos;t able to complete the survey, please take the test again.</p>
            <p>For best results, take the test once per day for the next 7 days.
              <br />
            Enter your email below to receive a reminder:</p>
            <EmailReminder/>
          </SectionBlurb>
        </SectionLeftContent>
        <SectionRightContent>
          <RSTCard
            title={<>You are <ServiceStatusTag size='big' serviceStatus={resultsFields?.serviceStatusText} /></>}
            description='Following NTIA grant guidelines, reliable broadband connections should have at least 100 Mbps download and 20 Mbps upload.'
          >
            <Result
              results={toolkitData}
              resultsFields={resultsFields}
            />
          </RSTCard>
          <RSTButton
            buttonTitle='Test again'
            onClick={handleStartTest}
          />
        </SectionRightContent>
      </SectionContent>
    </div>
  )
}

export default RSTResultSection
