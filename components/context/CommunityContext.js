import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { getUuid } from '/utils/uuid'
import { survey, GRAPHQL_API_URL } from '/utils/constants'

const CommunityContext = React.createContext()
const useCommunityContext = () => {
  const context = React.useContext(CommunityContext)
  if (context === undefined) {
    throw new Error('CommunityContext go wrong')
  }
  return context
}

const CommunityContextProvider = ({ children, config }) => {
  const router = useRouter()
  const [startTest, setStartTest] = useState(false)
  const [takeSurvey, setTakeSurvey] = useState(false)
  const [surveyComplete, setSurveyComplete] = useState(false)
  const [toolkitData, setToolkitData] = useState({})
  const [surveyData, setSurveyData] = useState({})
  const [organizationId, setOrganizationId] = useState(1411)
  const [testSource, setTestSource] = useState('')
  const [testType, setTestType] = useState('')
  const [testProgress, setTestProgress] = useState('')
  const [testSurvey, setTestSurvey] = useState(survey.slice())
  const [runTest, setRunTest] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [sameSetup, setSameSetup] = useState(false)
  const [sameSetupAns, setSameSetupAns] = useState(false)
  const [previousResults, setPreviousResults] = useState({})

  // eslint-disable-next-line
  useEffect(async () => {
    const metadata = await getMetadata()

    setSurveyData({
      ...surveyData,
      organizationId: config.organizationId,
      userId: metadata.userId,
      ipAddress: metadata.ipAddress,
      ispName: metadata.ispName,
    })

    setToolkitData({
      ...toolkitData,
      organizationId: config.organizationId,
      userId: metadata.userId,
      ipAddress: metadata.ipAddress,
      ispName: metadata.ispName,
      asn: metadata.asn,
      lat: metadata.lat,
      lon: metadata.lon,
      browserName: metadata.browserName,
      browserVersion: metadata.browserVersion,
      deviceType: metadata.deviceType,
      deviceVendor: metadata.deviceVendor,
      deviceModel: metadata.deviceModel,
      engineName: metadata.engineName,
      engineVersion: metadata.engineVersion,
      osName: metadata.osName,
      osVersion: metadata.osVersion,
      cpu: metadata.cpu
    })
    
    await setTestSurveyQuestions(metadata.ipAddress)

    const previousResultsData = await getPreviousResult(metadata.userId, metadata.ipAddress)
    setPreviousResults(previousResultsData?.[0])

  // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (testSurvey?.length === 0) {
      setSurveyComplete(true)
    }
  }, [testSurvey])
  
  /**
   * Gets an array of survey questions from local storage that have already been answered 
   * (while the test was running), and removes them from the testSurvey var that stores
   * which survey questions to display
   * @param {*} ipAddress 
   */
  async function setTestSurveyQuestions(ipAddress) {
    // Gets the array of already answered survey questions from local storage
    const answeredQsArray = JSON.parse(localStorage.getItem('answeredQs'));

    // If answered questions exist for the ipAddress in local storage, remove them from the testSurvey array
    if (answeredQsArray) {
      for (let i = 0; i < answeredQsArray.length ; i++) {
        if (answeredQsArray[i].ipAddress === ipAddress) {
          //console.log(answeredQsArray[i].answered)
          for (let j = 0; j < answeredQsArray[i].answered.length ; j++){
            let nestedAttrtibuteExists = false
            // Finds the index of an attribute/survey question that has already been answered
            const indexOfObject = testSurvey.findIndex(object => {
              if (object.type === 'nested') {
                let subQuestionArray = object.subquestions
                for (let k = 0; k < subQuestionArray.length; k++) {
                  if (subQuestionArray[k].attribute === answeredQsArray[i].answered[j] ) {
                    nestedAttrtibuteExists = true
                  }
                } 
                return nestedAttrtibuteExists
              }
                else {
                return object.attribute === answeredQsArray[i].answered[j];
              }
            });
            // Remove survey question from testSurvey 
            // testSurvey.splice(indexOfObject, 1);
            setTestSurvey(testSurvey)
          }
        }
      }
    }
    // Set to only 9 survey questions max
    setTestSurvey(testSurvey.slice(0, 9))
  }

  async function getMetadata() {
    return fetch('/api/metadata')
    .then(res => res.json())
    .then(incoming => {
      return {
        ipAddress: incoming?.ip,
        asn: incoming?.asn,
        browserName: incoming?.ua?.browser?.name,
        browserVersion: incoming?.ua?.browser?.version,
        deviceType: incoming?.ua?.device?.type,
        deviceVendor: incoming?.ua?.device?.vendor,
        deviceModel: incoming?.ua?.device?.model,
        engineName: incoming?.ua?.engine?.name,
        engineVersion: incoming?.ua?.engine?.version,
        osName: incoming?.ua?.os?.name,
        osVersion: incoming?.ua?.os?.version,
        cpu: incoming?.ua?.cpu?.architecture,
        lat: incoming?.loc?.lat || 0,
        lon: incoming?.loc?.lon || 0,
        userId: getUuid()
      }
    })
    .catch(err => console.log(err));
  }

  /**
   * Gets previous test result data
   * @param {*} ipAddress 
   * @returns 
   */
  async function getPreviousResult(userId, ipAddress) {
    const body = JSON.stringify({
      query: `query {
        getMultitestResults (userId:"${userId}", ipAddress:"${ipAddress}") {
          results {
            id
            connectionType
            noInterruptFromOtherDevices
            vpnOff
            address
            addressLat
            addressLon
            noService
            createdAt
          }
        }
      }`
    })
  
    return fetch(GRAPHQL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
    .then(res => res.json())
    .then (result => {
      return result?.data?.getMultitestResults?.results
    })
    .catch(err => console.log(err))
  }

  return (
    <CommunityContext.Provider
      value={{
        startTest,
        setStartTest,
        takeSurvey,
        setTakeSurvey,
        surveyComplete,
        setSurveyComplete,
        toolkitData,
        setToolkitData,
        surveyData,
        setSurveyData,
        organizationId,
        setOrganizationId,
        testSource,
        setTestSource,
        testType,
        setTestType,
        testProgress,
        setTestProgress, 
        testSurvey,
        runTest,
        setRunTest,
        sameSetup,
        showResult,
        setShowResult,
        setSameSetup,
        sameSetupAns,
        setSameSetupAns,
        previousResults,
        setPreviousResults
      }}
    >
      {children}
    </CommunityContext.Provider>
  )
}

export { useCommunityContext, CommunityContextProvider }
