import React, { useState, useEffect } from 'react'
import { getUnansweredQuestions } from 'utils/localStorageSurvey'

const ToolkitContext = React.createContext()
const useToolkitContext = () => {
  const context = React.useContext(ToolkitContext)
  if (context === undefined) {
    throw new Error('Error with ToolkitContext')
  }
  return context
}

const ToolkitContextProvider = ({ 
  config,
  previousResults,
  survey = [], 
  metadata, 
  setMetadata,
  callUpdateMultitestSurveyResponse, 
  callAddMultitestData, 
  children
}) => {
  const maxSurveyLength = 9
  const [surveyComplete, setSurveyComplete] = useState(false)
  const [surveySegment, setSurveySegment] = useState(survey.slice())

  useEffect(() => {
    setSurveySegment(getUnansweredQuestions(survey, metadata?.ipAddress).slice(0, maxSurveyLength))
  }, [metadata])

  useEffect(() => {
    if (surveySegment?.length === 0) {
      setSurveyComplete(true)
    }
  }, [surveySegment])

  return (
    <ToolkitContext.Provider
      value={{
        config,
        previousResults,
        survey,
        metadata,
        setMetadata,
        callUpdateMultitestSurveyResponse,
        callAddMultitestData,
        surveySegment,
        surveyComplete,
        setSurveyComplete
      }}
    >
      {children}
    </ToolkitContext.Provider>
  )
}

export { useToolkitContext, ToolkitContextProvider }
