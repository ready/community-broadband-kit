import React, { useEffect } from 'react'

import Header from '../../common/Header/Header'
import RSTResultSection from './RSTResultSection'
import RSTTestingSection from './RSTTestingSection'
import RSTBeforeTestSection from './RSTBeforeTestSection'
import RSTSameSetup from './RSTSameSetup'
import styles from './RSTTest.module.css'
import { useCommunityContext } from '../../context/CommunityContext'

const RSTTest = () => {
  const {
    sameSetup,
    sameSetupAns,
    startTest,
    runTest,
    setRunTest,
    showResult,
    setShowResult,
    takeSurvey
  } = useCommunityContext()

  const handleShowResult = () => {
    setShowResult(!showResult)
  }

  useEffect(() => {
    if (sameSetupAns) setRunTest(true)
  // eslint-disable-next-line
  }, [sameSetupAns])

  const renderSection = () => {
    if (sameSetup && startTest && !takeSurvey) return <RSTSameSetup />
    else if (showResult && !sameSetup && !takeSurvey) return <RSTResultSection />
    else if (runTest && !sameSetup) return <RSTTestingSection handleShowResult={handleShowResult} />
    else if (startTest && !sameSetupAns && !showResult && !takeSurvey) return <RSTBeforeTestSection setRunTest={setRunTest} />
  }

  return (
    <section className={styles.test}>
      <Header logoColor='white' hero page='broadband-audits' />
      {renderSection()}
    </section>
  )
}

export default RSTTest
