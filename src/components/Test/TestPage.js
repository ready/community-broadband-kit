import React from 'react'
import Layout from '../common/Layout/Layout'
import TestWrapper from './TestWrapper'
import { useAppContext } from '../common/Context/AppContext'
import { ToolkitContextProvider } from '../common/Context/ToolkitContext'

const TestPage = () => {
  const {
    previousResults,
    metadata,
    setMetadata,
    callUpdateMultitestSurveyResponse,
    callAddMultitestData,
    survey
  } = useAppContext()

  return (
    <ToolkitContextProvider
      config={window.CONFIG}
      previousResults={previousResults}
      metadata={metadata}
      setMetdata={setMetadata}
      callUpdateMultitestSurveyResponse={callUpdateMultitestSurveyResponse}
      callAddMultitestData={callAddMultitestData}
      survey={survey}
    >
      <Layout>
        <TestWrapper />
      </Layout>
    </ToolkitContextProvider>
  )
}

export default TestPage
