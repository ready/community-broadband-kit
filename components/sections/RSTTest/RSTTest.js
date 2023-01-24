import React, { useEffect } from 'react'

import Header from '../../common/Header/Header'
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
    setStartTest,
    previousResults, 
    setSameSetup,
    runTest,
    setRunTest,
    takeSurvey,
  } = useCommunityContext()

  setStartTest(true)
  // if (previousResults?.connectionType !== 'undefined') setSameSetup(true)

  useEffect(() => {
    if (sameSetupAns) setRunTest(true)
  // eslint-disable-next-line
  }, [sameSetupAns])

  const renderSection = () => {
    if (sameSetup && startTest && !takeSurvey) return <RSTSameSetup />
    else if (runTest && !sameSetup) return <RSTTestingSection />
    else if (startTest && !sameSetupAns && !takeSurvey) return <RSTBeforeTestSection setRunTest={setRunTest} />
  }

  return (
    <section className={styles.test}>
      <Header logoColor='white' hero page='broadband-audits' />
      {renderSection()}
    </section>
  )
}

export default RSTTest
