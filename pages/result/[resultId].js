import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import SectionContent from '../../components/common/SectionContent/SectionContent'
import RSTCard from '../../components/common/Card/RSTCard'
import ServiceStatusTag from '../../components/RST/ServiceStatusTag'
import { useCommunityContext } from '../../components/context/CommunityContext'
import Result from '../../components/RST/Result'
import styles from '../../components/sections/RSTTest/RSTResultSection.module.css'
import stylesTest from '../../components/sections/RSTTest/RSTTest.module.css'
import Layout from '../../components/common/Layout/Layout'
import Header from '../../components/common/Header/Header'
import { GRAPHQL_API_URL } from '../../utils/constants'

const RSTResult = ({ config }) => {
  const router = useRouter()
  
  const { toolkitData, setToolkitData } = useCommunityContext()
  const [resultsFields, setResultsFields] = useState()

  useEffect(async () => {
    const resultsData = await getResults(router.query.resultId)
    setToolkitData(resultsData)
    await getResultsFields(resultsData)
  }, [router])

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
    fetch('/api/getResultsFields', {
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
    <Layout
      title={'Broadband.Money Community Toolkit: Free Broadband Tests'}
      description={`Gather Broadband.Money's broadband test results to build empirical proof for BEAD's eligibility and challenge process. Find out the unserved and underserved status of broadband serviceable locations in Broadband.Money's area.`}
      ogDescription={`This quick and easy test helps you and your neighbors in Broadband.Money win grants to deliver you better broadband service."`}
      keywords={`Broadband, Internet Speed Test`}
      ogImage='https://storage.googleapis.com/boss-public-assets-prod/measure-broadband.png'
      config={config}
    >
    <section className={stylesTest.test}>
      <Header logo={config?.logo} logoColor='white' hero page='broadband-audits' />
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
    </Layout>
  )
}

export default RSTResult