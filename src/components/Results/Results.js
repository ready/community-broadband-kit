import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import SectionContent from '../common/SectionContent/SectionContent'
import RSTCard from '../common/Card/RSTCard'
import ServiceStatusTag from '../RST/ServiceStatusTag'
import { useCommunityContext } from '../context/CommunityContext'
import Result from '../RST/Result'
import styles from '../sections/RSTTest/RSTResultSection.module.css'
import stylesTest from '../sections/RSTTest/RSTTest.module.css'
import Header from '../common/Header/Header'
import { GRAPHQL_API_URL } from '../../utils/constants'

const RSTResult = () => {
  const params = useParams()
  
  const { toolkitData, setToolkitData } = useCommunityContext()
  const [resultsFields, setResultsFields] = useState()

  useEffect(() => {
    async function setResultsData() {
      const resultsData = await getResults(params.resultId)
      setToolkitData(resultsData)
      await getResultsFields(resultsData)
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

  async function getResultsFields(resultsData){
    fetch('/getResultsFields', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        results: resultsData
      })
    })
    .then(res => res.json())
    .then(fields => setResultsFields(fields))
    .catch((error) => {
       console.log(error)
    })
  }

  return (
    <>
      <section className={stylesTest.test}>
        <Header logoColor='white' hero page='broadband-audits' />
        <div className={styles.resultSection}>
          <SectionContent>
            <RSTCard
              title={<>You are <ServiceStatusTag size='big' serviceStatus={resultsFields?.serviceStatusText} /></>}
              description='Following NTIA grant guidelines, reliable broadband connections should have at least 100 Mbps download and 20 Mbps upload.'
            >
              <Result
                results={toolkitData}
                resultsFields={resultsFields}
              />
            </RSTCard>
          </SectionContent>
        </div>
      </section>
    </>
  )
}

export default RSTResult