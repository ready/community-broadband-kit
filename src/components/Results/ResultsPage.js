import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import SectionContent from '../common/SectionContent/SectionContent'
import StepCard from '../common/Card/StepCard'
import ServiceStatusTag from '../common/Tags/ServiceStatusTag'
import { useAppContext } from '../common/Context/AppContext'
import Result from '../common/Result/Result'
import styles from '../Test/Results/ResultSection.module.css'
import stylesTest from '../Test/TestWrapper.module.css'
import { GRAPHQL_API_URL } from '../../utils/constants'
import getResultsFields from '../../utils/getResultsFields'

const ResultPage = () => {
  const params = useParams()
  const { strengthTestData, setStrengthTestData } = useAppContext()
  const [resultsFields, setResultsFields] = useState()

  useEffect(() => {
    async function setResultsData() {
      const resultsData = await getResults(params.resultId)
      setStrengthTestData(resultsData)
      setResultsFields(getResultsFields(resultsData))
    }
    setResultsData()
  }, [params])

  /**
   * Fetches the database record assocatiated with a test result id
   * @param {*} id The id of the result in the database
   * @returns The record associated with the result id
   */
  async function getResults(id) {
    const body = JSON.stringify({
        query: `query {
            getMultitestResult (id:"${id}") {
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
        }`
    });

    return fetch(GRAPHQL_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    })
    .then(res => res.json())
    .then (result => {
        return result.data.getMultitestResult;
    })
    .catch(err => console.log(err));
  }

  return (
    <>
      <section className={stylesTest.test}>
        <div className={styles.resultSection}>
          <SectionContent>
            <StepCard
              title={<>You are <ServiceStatusTag size='big' serviceStatus={resultsFields?.serviceStatusText} /></>}
              description='Following NTIA grant guidelines, reliable broadband connections should have at least 100 Mbps download and 20 Mbps upload.'
            >
              <Result
                results={strengthTestData}
                resultsFields={resultsFields}
              />
            </StepCard>
          </SectionContent>
        </div>
      </section>
    </>
  )
}

export default ResultPage