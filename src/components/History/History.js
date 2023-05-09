import React, { useState } from 'react'
import { Table, Tag } from 'antd'
import { useCommunityContext } from '../context/CommunityContext'
import styles from '../sections/RSTTest/RSTResultSection.module.css'
import stylesTest from '../sections/RSTTest/RSTTest.module.css'
import Header from '../common/Header/Header'
import SectionContent from '../common/SectionContent/SectionContent'
import { gql, useQuery } from '@apollo/client'

const History = () => {
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
    <>
      <section className={stylesTest.test}>
          <Header logoColor='white' hero page='broadband-audits' />
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
    </>
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