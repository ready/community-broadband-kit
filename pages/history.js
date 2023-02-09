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
import { gql, useQuery } from '@apollo/client'


  const History = ({ config }) => {
    const {
        toolkitData
      } = useCommunityContext()

    const [cursorPagination] = useState({all: true})
    
    const {
      data: { getMultitestResults } = {}
    } = useQuery(GET_TEST_RESULTS, {
      fetchPolicy: 'network-and-cache',
      variables: {
        userId: toolkitData?.userId,
        cursorPagination: cursorPagination
      }
    })
      
    const columns = [
      {
          title: <p>Upload <span>Mbps</span></p>,
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
          title: <p>Download <span>Mbps</span></p>,
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
          title: <p>Latency <span>ms</span></p>,
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
          title: <p>Jitter <span>ms</span></p>,
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
          title: <p>Date</p>,
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
            config={config}
        >
        <section className={stylesTest.test}>
            <Header config={config} logoColor='white' hero page='broadband-audits' />
            <div className={styles.resultSection}>
                <SectionContent>
                    <Table
                      dataSource={getMultitestResults?.results}
                      columns={columns}
                      className={styles.historyTable}
                      rowKey='id'
                      bordered
                      pagination={{
                        pageSize: 10,
                      }}
                      showSorterTooltip={false}
                    />
                </SectionContent>
            </div>
        </section>
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

export default History