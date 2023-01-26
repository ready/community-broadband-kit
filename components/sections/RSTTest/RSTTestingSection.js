import React, { useContext, useEffect } from 'react'
import { Button } from 'antd'

import SectionContent from '../../common/SectionContent/SectionContent'
import SectionLeftContent from '../../common/SectionContent/SectionLeftContent'
import SectionRightContent from '../../common/SectionContent/SectionRightContent'
import LoadBar from '../../RST/LoadBar'
import OoklaLoading from '../../RST/OoklaLoading'
import RSTSurvey  from '../../RST/RSTSurvey'
import { useCommunityContext } from '../../context/CommunityContext'
import config from '/utils/testConfig'
import runTests from '/utils/test/runTests'
import { gql, useMutation } from '@apollo/client'
import rollupResults from '/utils/rollupResults'
import { useRouter } from 'next/router'

import styles from './RSTTestingSection.module.css'

const RSTTestingSection = ({ handleShowResult }) => {
  const {
    testSource,
    setTestSource,
    testType,
    setTestType,
    testProgress,
    setTestProgress,
    ispName,
    toolkitData,
    setToolkitData,
    surveyComplete,
  } = useCommunityContext()

  const [addMultitestData] = useMutation(ADD_MULTITEST_DATA)

  const router = useRouter()

  useEffect(async () => {
    const state = {
      setTestSource,
      setTestType,
      setTestProgress
    }

    setTestSource('M-Lab')
    setTestType('Downloading')

    let results = await runTests(state, config)
    results = {...results, ...rollupResults(results)}

    for (const result in results) {
      results[result] = Number(results[result])
    }

    const data = {...toolkitData, ...results}
    let res = await addMultitestData({ variables: {testData: data} })
    // console.log(res.data?.addMultitestData.id)
    setToolkitData(data)

    handleShowResult()

    // Update route without navigating to it
    router.push(`/test`,`/result/${res.data?.addMultitestData.id}`, { shallow: true })
  }, [])

  return (
    <SectionContent>
      <div className={`${surveyComplete && styles.onlyTestingSection} ${styles.testingSectionWrap}`}>
        <SectionLeftContent>
          <div className={styles.testingSection}>
            <h2 className={styles.testHeading}>
              Running {testSource}...
            </h2>
            {testSource === 'Speedtest.net' && <OoklaLoading />}
            {!(testSource === 'Speedtest.net') && 
            <h3 className={styles.testType}>
              {testType}
            </h3>}
            {!(testSource === 'Speedtest.net') && 
            <h3 className={styles.testSpeed}>
              {testProgress} 
              {
                testProgress 
                ? (testType === 'Pinging' ? ' ms' : ' Mbps')
                : <>&nbsp;</>
              }
            </h3>}
            <h3 className={styles.testType}>
              {ispName}
            </h3>
            <LoadBar />
          </div>
        </SectionLeftContent>
      </div>
      <div
        className={styles.testingSectionWrap}
        style={{ display: surveyComplete ? 'none' : 'block' }}
      >
        <SectionRightContent>
          <RSTSurvey />
        </SectionRightContent>
      </div>
    </SectionContent>
  )
}

export default RSTTestingSection

const ADD_MULTITEST_DATA = gql`
mutation addMultitestData($testData: MultitestDataInput!) {
  addMultitestData(data: $testData) {
    id
  }
}
`