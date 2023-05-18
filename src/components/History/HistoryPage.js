import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { useAppContext } from 'components/common/Context/AppContext'
import Layout from 'components/common/Layout/Layout'
import HistoryTable from './HistoryTable'

const HistoryPage = () => {
  const {
    metadata
  } = useAppContext()

  const {
    data: { getMultitestResults } = {}
  } = useQuery(GET_TEST_RESULTS, {
    fetchPolicy: 'network-and-cache',
    variables: {
      userId: metadata?.userId,
      cursorPagination: {all: true}
    }
  })


  return (
    <Layout>
      <HistoryTable history={getMultitestResults?.results}/>
    </Layout>
  )
}

const GET_TEST_RESULTS = gql`
query getMultitestResults($userId: String, $cursorPagination: CursorPagination) {
  getMultitestResults(userId: $userId, cursorPagination: $cursorPagination) {
    results {
      id
      medianLatency
      medianJitter
      medianUpload
      medianDownload
      noService
      createdAt
    },
    pageInfo {
        hasNext
        hasPrevious
        next
        previous
        total
    }
  }
}
`

export default HistoryPage