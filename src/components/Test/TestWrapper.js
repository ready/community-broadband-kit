import React, { useState, useEffect } from 'react'
import TestingSection from './Testing/TestingSection'
import BeforeTestSection from './BeforeTest/BeforeTestSection'
import ResultSection from './Results/ResultSection'
import SameSetup from './BeforeTest/SameSetup'
import styles from './TestWrapper.module.css'
import { useToolkitContext } from 'components/common/Context/ToolkitContext'

const TestWrapper = () => {
  const {
    config,
    metadata
  } = useToolkitContext()

  const [currentDisplay, setCurrentDisplay] = useState('')
  const [testData, setTestData] = useState({})

  useEffect(() => {
    if (metadata?.connectionType != null && metadata?.vpnOff != null && metadata?.noInterruptFromOtherDevices != null) {
      setCurrentDisplay('same-setup')
    } else {
      setCurrentDisplay('before-test')
    }
  }, [metadata])

  const renderSection = () => {
    switch (currentDisplay) {
      case 'same-setup':
        return <SameSetup setCurrentDisplay={setCurrentDisplay} />
      case 'before-test':
        return <BeforeTestSection setParentDisplay={setCurrentDisplay} config={config} />
      case 'testing':
        return <TestingSection setCurrentDisplay={setCurrentDisplay} setTestData={setTestData} />
      case 'result':
        return <ResultSection setCurrentDisplay={setCurrentDisplay} testData={testData} />
      default:
        return <></>
    }
  }

  return (
    <section className={styles.test}>
      {renderSection()}
    </section>
  )
}

export default TestWrapper
