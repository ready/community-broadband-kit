import React, { useEffect, useState } from 'react'
import { Table, Tag, Space} from 'antd'
import { useCommunityContext } from '../components/context/CommunityContext'
import { GRAPHQL_API_URL } from '../utils/constants'
import styles from '../components/sections/RSTTest/RSTResultSection.module.css'
import stylesTest from '../components/sections/RSTTest/RSTTest.module.css'
import Layout from '../components/common/Layout/Layout'
import Header from '../components/common/Header/Header'
import SectionContent from '../components/common/SectionContent/SectionContent'
import { Link } from 'react-router-dom'
import Title from '../components/common/Title/Title'
import SectionBlurb from '../components/common/SectionBlurb/SectionBlurb'

  const History = () => {
    const {
        toolkitData
      } = useCommunityContext()

    const [dataSource, setDataSource] = useState([])


    useEffect(async () => {
        const testResults = await getMultitestResults(toolkitData.userId)
        console.log(testResults)
        setDataSource(testResults)
      }, [toolkitData])

    async function getMultitestResults(userId) {
        const body = JSON.stringify({
            query: `query {
                getMultitestResults (userId:"${userId}") {
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
            //hasNext = result.data.getMultitestResults.pageInfo.hasNext
            //next = result.data.getMultitestResults.pageInfo.next
        
            return result.data.getMultitestResults.results;
        })
        .catch(err => console.log(err))
      }
      
      const columns = [
        {
            title: 'Upload Mbps',
            dataIndex: 'medianUpload',
            key: 'medianUpload',
            render: (upload, record) => {
                if (upload) {
                    return (
                        <>
                          <a href={`result/${record.id}`}>{upload.toFixed(1)}</a>
                        </>
                      )
                } else {
                  return <Tag key='upload'>--</Tag>
                }
              }
          },
          {
            title: 'Download Mbps',
            dataIndex: 'medianDownload',
            key: 'medianDownload',
            render: (download, record) => {
                if (download) {
                    return (
                        <>
                          <a href={`result/${record.id}`}>{download.toFixed(1)}</a>
                        </>
                      )
                } else {
                  return <Tag key='download'>--</Tag>
                }
            }
          },
          {
            title: 'Latency ms',
            dataIndex: 'medianLatency',
            key: 'medianLatency',
            render: (latency, record) => {
                if (latency) {
                    return (
                        <>
                          <a href={`result/${record.id}`}>{latency.toFixed(1)}</a>
                        </>
                      )
                } else {
                  return <Tag key='latency'>--</Tag>
                }
            }
          },
          {
            title: 'Jitter ms',
            dataIndex: 'medianJitter',
            key: 'medianJitter',
            render: (jitter, record) => {
                if (jitter) {
                    return (
                        <>
                          <a href={`result/${record.id}`}>{jitter.toFixed(1)}</a>
                        </>
                      )
                } else {
                  return <Tag key='jitter'>--</Tag>
                }
              }
          },
          {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date, record) => {
                if (date) {
                    const dateFormatted = new Date(date).toLocaleDateString()
                    return (
                        <>
                          <a href={`result/${record.id}`}>{dateFormatted}</a>
                        </>
                    ) 
                }
              }
          },
          
      ]

    return (
        <Layout
            title={'Broadband.Money Community Toolkit: Free Broadband Tests'}
            description={`Gather Broadband.Money's broadband test results to build empirical proof for BEAD's eligibility and challenge process. Find out the unserved and underserved status of broadband serviceable locations in Broadband.Money's area.`}
            ogDescription={`This quick and easy test helps you and your neighbors in Broadband.Money win grants to deliver you better broadband service."`}
            keywords={`Broadband, Internet Speed Test`}
            ogImage='https://storage.googleapis.com/boss-public-assets-prod/measure-broadband.png'
        >
        <section className={stylesTest.test}>
            <Header logoColor='white' hero page='broadband-audits' />
            <div className={styles.resultSection}>
                <SectionContent>
                    <Table dataSource={dataSource} columns={columns} />
                </SectionContent>
            </div>
        </section>
        </Layout>
    )
  }

export default History