import React, { useEffect } from 'react'

import Header from '../../common/Header/Header'
import RSTTestingSection from './RSTTestingSection'
import RSTBeforeTestSection from './RSTBeforeTestSection'
import RSTResultSection from './RSTResultSection'
import RSTSameSetup from './RSTSameSetup'
import styles from './RSTTest.module.css'
import { useCommunityContext } from '../../context/CommunityContext'

const RSTTest = ({ config }) => {
  const {
    sameSetup,
    sameSetupAns,
    startTest,
    setStartTest,
    previousResults, 
    setSameSetup,
    runTest,
    setRunTest,
    showResult,
    setShowResult,
    takeSurvey,
  } = useCommunityContext()

  setStartTest(true)
  // if (previousResults?.connectionType !== 'undefined') setSameSetup(true)

  const handleShowResult = () => {
    setShowResult(!showResult)
  }


  useEffect(() => {
    if (sameSetupAns) setRunTest(true)
  // eslint-disable-next-line
  }, [sameSetupAns])

  const renderSection = () => {
    if (sameSetup && startTest && !takeSurvey) return <RSTSameSetup />
    else if (showResult && !sameSetup && !takeSurvey) return <RSTResultSection config={config}/>
    else if (runTest && !sameSetup) return <RSTTestingSection handleShowResult={handleShowResult} />
    else if (startTest && !sameSetupAns && !showResult && !takeSurvey) return <RSTBeforeTestSection setRunTest={setRunTest} config={config} />
  }

  return (
    <section className={styles.test}>
      <Header config={config} logoColor='white' hero page='broadband-audits' />
      {renderSection()}
    </section>
  )
}

export default RSTTest
