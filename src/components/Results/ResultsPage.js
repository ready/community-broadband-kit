import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
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

  const [serviceStatus, setServiceStatus] = useState(null)

  const {
    data: { getMultitestResult } = {}
  } = useQuery(GET_MULTITEST_RESULT, {
    fetchPolicy: 'network-only',
    skip: !params?.resultId,
    variables: {
      id: params?.resultId
    }
  })

  useEffect(() => {
    if (getMultitestResult) {
      setServiceStatus(getServiceStatus(getMultitestResult))
    }
  }, [getMultitestResult])

  return (
    <Layout>
      <section className={styles.container}>
        <div className={styles.resultSection}>
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
        </div>
      </section>
    </Layout>
  )
}

export default ResultPage

const GET_MULTITEST_RESULT = gql`
  query getMultitestResult($id: ID!) {
    getMultitestResult(id: $id) {
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
`