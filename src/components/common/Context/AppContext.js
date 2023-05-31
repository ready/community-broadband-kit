import React, { useState, useEffect } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { getUuid } from 'utils/uuid'
import { survey, SERVERLESS_TESTING_FLAG, SERVERLESS_TESTING_CONFIG } from 'utils/constants'

const AppContext = React.createContext()
const useAppContext = () => {
  const context = React.useContext(AppContext)
  if (context === undefined) {
    throw new Error('Error with AppContext')
  }
  return context
}

const AppContextProvider = ({ children }) => {
  let config
  if (SERVERLESS_TESTING_FLAG) {
    config = SERVERLESS_TESTING_CONFIG
  } else {
    config = window.CONFIG
  }

  const userId = getUuid()
  const [updateMultitestSurveyResponse] = useMutation(UPDATE_MULTITEST_SURVEY_RESPONSE)
  const [addMultitestData] = useMutation(ADD_MULTITEST_DATA)
  const [metadata, setMetadata] = useState({})
  const [previousResults, setPreviousResults] = useState({})

  const {
    data: { getMultitestResults } = {}
  } = useQuery(GET_MULTITEST_RESULTS, {
    fetchPolicy: 'network-only',
    skip: !metadata?.userId || !metadata?.ipAddress,
    variables: {
      userId: metadata?.userId,
      ipAddress: metadata?.ipAddress,
      cursorPagination: {all: true}
    }
  })

  const callUpdateMultitestSurveyResponse = async (surveyAnswers) => {
    try {
      const res = await updateMultitestSurveyResponse({ variables: {
        surveyData: {
          organizationId: config?.organizationId,
          userId,
          ipAddress: metadata?.ipAddress,
          phoneNumber: metadata?.phoneNumber,
          ispName: metadata?.ispName,
          addressLat: metadata.addressLat,
          addressLon: metadata.addressLat,
          address: metadata.address,
          ...surveyAnswers 
        }
      } })
      if (res.data?.updateMultitestSurveyResponse?.success) {
        return true
      } else {
        return false
      }
    } catch (e) {
      console.error(e)
      return false
    }
  }

  const callAddMultitestData = async (testData) => {
    try {
      const res = await addMultitestData({ 
        variables: {
          testData: {
            organizationId: config?.organizationId,
            userId,
            ipAddress: metadata?.ipAddress,
            ispName: metadata?.ispName,
            asn: metadata?.asn,
            lat: metadata?.lat,
            lon: metadata?.lon,
            browserName: metadata?.browserName,
            browserVersion: metadata?.browserVersion,
            deviceType: metadata?.deviceType,
            deviceVendor: metadata?.deviceVendor,
            deviceModel: metadata?.deviceModel,
            engineName: metadata?.engineName,
            engineVersion: metadata?.engineVersion,
            osName: metadata?.osName,
            osVersion: metadata?.osVersion,
            cpu: metadata?.cpu,
            addressLat: metadata?.addressLat,
            addressLon: metadata?.addressLat,
            address: metadata?.address,
            connectionType: metadata?.connectionType,
            vpnOff: metadata?.vpnOff,
            noInterruptFromOtherDevices: metadata?.noInterruptFromOtherDevices,
            ...testData 
          }
        } 
      })

      if (res.data?.addMultitestData?.id) {
        return res.data?.addMultitestData?.id
      } else {
        return false
      }
    } catch (e) {
      console.error(e)
      return false
    }
  }
      
  // Fetches metadata from the server
  useEffect(() => {
    async function getMetadata() {
      return fetch('/metadata')
      .then(res => res.json())
      .then(incoming => {
         const data = {
          ipAddress: incoming?.ip,
          ispName: incoming?.isp,
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
          lon: incoming?.loc?.lon || 0
        }
        setMetadata(data)
      })
      .catch(err => console.log(err))
    }

    if (SERVERLESS_TESTING_FLAG) return
    getMetadata()
  }, [])

  useEffect(() => {
    setPreviousResults(getMultitestResults?.results?.[0])
  }, [getMultitestResults])

  useEffect(() => {
    setMetadata({
      ...metadata,
      connectionType: previousResults?.connectionType,
      vpnOff: previousResults?.vpnOff,
      noInterruptFromOtherDevices: previousResults?.noInterruptFromOtherDevices,
    })
  }, [previousResults])

  return (
    <AppContext.Provider
      value={{
        config,
        survey,
        previousResults,
        metadata,
        setMetadata,
        callUpdateMultitestSurveyResponse,
        callAddMultitestData
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const GET_MULTITEST_RESULTS = gql`
  query getMultitestResults($userId: String!, $cursorPagination: CursorPaginationInput) {
    getMultitestResults(userId: $userId, cursorPagination: $cursorPagination) {
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
  }
`

const UPDATE_MULTITEST_SURVEY_RESPONSE = gql`
  mutation updateMultitestSurveyResponse($surveyData: MultitestSurveyResponseInput!) {
    updateMultitestSurveyResponse(data: $surveyData) {
      success
      message
    }
  }
`

const ADD_MULTITEST_DATA = gql`
mutation addMultitestData($testData: MultitestDataInput!) {
  addMultitestData(data: $testData) {
    id
  }
}
`

export { useAppContext, AppContextProvider }
