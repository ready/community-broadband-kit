import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import SectionContent from '../../components/common/SectionContent/SectionContent'
import SectionLeftContent from '../../components/common/SectionContent/SectionLeftContent'
import SectionRightContent from '../../components/common/SectionContent/SectionRightContent'
import SectionBlurb from '../../components/common/SectionBlurb/SectionBlurb'
import RSTCard from '../../components/common/Card/RSTCard'
import RSTButton from '../../components/RST/RSTButton'
import EmailReminder from '../../components/RST/EmailReminder'
import ServiceStatusTag from '../../components/RST/ServiceStatusTag'
import { useCommunityContext } from '../../components/context/CommunityContext'
import Result from '../../components/RST/Result'
import styles from '../../components/sections/RSTTest/RSTResultSection.module.css'
import stylesTest from '../../components/sections/RSTTest/RSTTest.module.css'
import Layout from '../../components/common/Layout/Layout'
import Header from '../../components/common/Header/Header'

const RSTResult = () => {
  const router = useRouter()
  
  const resultId = router.query.resultId

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
    <Layout
      title={'Broadband.Money Community Toolkit: Free Broadband Tests'}
      description={`Gather Broadband.Money's broadband test results to build empirical proof for BEAD's eligibility and challenge process. Find out the unserved and underserved status of broadband serviceable locations in Broadband.Money's area.`}
      ogDescription={`This quick and easy test helps you and your neighbors in Broadband.Money win grants to deliver you better broadband service."`}
      keywords={`Broadband, Internet Speed Test`}
      ogImage='https://storage.googleapis.com/boss-public-assets-prod/measure-broadband.png'
    >
    <section className={stylesTest.test}>
      <Header logoColor='white' hero page='broadband-audits' />
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
    </section>
    </Layout>
  )
}

export default RSTResult