import React from 'react'
import Layout from '../common/Layout/Layout'
import SurveyWrapper from './SurveyWrapper'
import { useAppContext } from '../common/Context/AppContext'
import { ToolkitContextProvider } from '../common/Context/ToolkitContext'

const SurveyPage = () => {
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
        <SurveyWrapper />
      </Layout>
    </ToolkitContextProvider>
  )
}

export default SurveyPage
