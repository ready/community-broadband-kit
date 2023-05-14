import React from 'react'
import Layout from '../common/Layout/Layout'
import TestWrapper from './TestWrapper'
import { useAppContext } from '../common/Context/AppContext'
import { ToolkitContextProvider } from '../common/Context/ToolkitContext'

const TestPage = () => {
  const {
    metadata,
    setMetadata,
    callUpdateMultitestSurveyResponse,
    callAddMultitestData
  } = useAppContext()

  return (
    <ToolkitContextProvider
      config={window.CONFIG}
      metadata={metadata}
      setMetdata={setMetadata}
      callUpdateMultitestSurveyResponse={callUpdateMultitestSurveyResponse}
      callAddMultitestData={callAddMultitestData}
    >
      <Layout>
        <TestWrapper />
      </Layout>
    </ToolkitContextProvider>
  )
}

export default TestPage
