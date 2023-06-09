import React, { useState, useEffect } from 'react'
import SectionContent from 'components/common/SectionContent/SectionContent'
import SectionLeftContent from 'components/common/SectionContent/SectionLeftContent'
import SectionRightContent from 'components/common/SectionContent/SectionRightContent'
import LoadBar from './LoadBar'
import OoklaLoading from './OoklaLoading'
import config from './testSrc/testConfig'
import runTests from './testSrc/runTests'
import { useNavigate } from 'react-router-dom'
import styles from './TestingSection.module.css'
import { useToolkitContext } from 'components/common/Context/ToolkitContext'
import Survey from 'components/common/Survey/Survey'

const TestingSection = ({ setCurrentDisplay, setTestData }) => {
  const {
    metadata,
    callAddMultitestData,
    surveySegment
  } = useToolkitContext()

  const navigate = useNavigate()
  const [testSource, setTestSource] = useState('')
  const [testType, setTestType] = useState('')
  const [testProgress, setTestProgress] = useState('')
  const [surveyComplete, setSurveyComplete] = useState(surveySegment?.length === 0 ? true : false)

  useEffect(() => {
    async function runTest() {
      const stateSetters = {
        setTestSource,
        setTestType,
        setTestProgress
      }
  
      setTestSource('M-Lab')
      setTestType('Downloading')
  
      let results = await runTests(stateSetters, config, callAddMultitestData)
      const resultId = results?.id
  
      setTestData(results)
      if (resultId) {
        const resultUrl = `${window.location.origin}/result/${resultId}`
        window.history.replaceState({}, '', resultUrl)
      }
      setCurrentDisplay('result')
    }
    runTest()
  }, [])

  return (
    <SectionContent>
      <div className={`${surveyComplete && styles.onlyTestingSection} ${styles.testingSectionWrap}`}>
        <SectionLeftContent>
          <div className={styles.testingSection}>
            <h2 className={styles.testHeading}>
              Running {testSource}...
            </h2>
            {(testSource === 'Speedtest.net' || testSource === 'Cloudflare') && <OoklaLoading />}
            {!(testSource === 'Speedtest.net') && !(testSource === 'Cloudflare') && 
            <h3 className={styles.testType}>
              {testType}
            </h3>}
            {!(testSource === 'Speedtest.net') && !(testSource === 'Cloudflare') && 
            <h3 className={styles.testSpeed}>
              {testProgress} 
              {
                testProgress 
                ? (testType === 'Pinging' ? ' ms' : ' Mbps')
                : <>&nbsp;</>
              }
            </h3>}
            <h3 className={styles.testType}>
              {metadata?.ispName}
            </h3>
            <LoadBar testSource={testSource} />
          </div>
        </SectionLeftContent>
      </div>
      <div
        className={styles.testingSectionWrap}
        style={{ display: surveyComplete ? 'none' : 'block' }}
      >
        <SectionRightContent>
          <Survey 
            survey={surveySegment} 
            onFinish={() => setSurveyComplete(true)}
          />
        </SectionRightContent>
      </div>
    </SectionContent>
  )
}

export default TestingSection