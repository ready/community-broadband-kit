import { useParams } from 'react-router-dom'
import React from 'react'
import { useQuery, gql } from '@apollo/client'
import Result from '../common/Result/Result'
import Layout from '../common/Layout/Layout'
import SectionContent from '../common/SectionContent/SectionContent'
import StepCard from '../common/Card/StepCard'
import ServiceStatusTag from '../common/Tags/ServiceStatusTag'
import getServiceStatus from '../../utils/getServiceStatus'
import styles from './ResultsPage.module.css'

const ResultPage = () => {
  const params = useParams()

  const {
    data: { getMultitestResult } = {}
  } = useQuery(GET_MULTITEST_RESULT, {
    fetchPolicy: 'network-only',
    skip: !params?.resultId,
    variables: {
      id: params?.resultId
    }
  })

  const serviceStatus = getServiceStatus(getMultitestResult)

  return (
    <Layout>
      <section className={styles.container}>
        <SectionContent>
          <StepCard
            title={<>You are <ServiceStatusTag size='big' serviceStatus={serviceStatus?.serviceStatusText} /></>}
            description='Following NTIA grant guidelines, reliable broadband connections should have at least 100 Mbps download and 20 Mbps upload.'
          >
            <Result
              results={getMultitestResult}
              serviceStatus={serviceStatus}
            />
          </StepCard>
        </SectionContent>
      </section>
    </Layout>
  )
}

export default ResultPage

const GET_MULTITEST_RESULT = gql`
  query getMultitestResults($id: ID!) {
    getMultitestResults(id: $id) {
      results {
        mlabUpload
        mlabDownload
        mlabLatency
        mlabJitter
        rstLatency
        rstJitter
        rstUpload
        rstDownload
        ooklaLatency
        ooklaJitter
        ooklaUpload
        ooklaDownload
        medianUpload
        medianDownload
        medianJitter
        medianLatency
      }
    }
  }
`