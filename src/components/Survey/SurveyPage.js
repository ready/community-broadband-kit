import React from 'react'
import Layout from 'components/common/Layout/Layout'
import SurveyWrapper from './SurveyWrapper'
import { useAppContext } from 'components/common/Context/AppContext'
import { ToolkitContextProvider } from 'components/common/Context/ToolkitContext'

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
