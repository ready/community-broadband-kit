import SectionContent from '../common/SectionContent/SectionContent'
import { Table, Tag } from 'antd'
import styles from './HistoryTable.module.css'
import { useNavigate } from 'react-router-dom'

const HistoryTable = ({ history }) => {
  const navigate = useNavigate()

  const columns = [
      {
        title: <p>Date</p>,
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date, record) => {
            if (date) {
                const dateFormatted = new Date(date).toLocaleDateString()
                return (
                    <>
                      <span>{dateFormatted}</span>
                    </>
                ) 
            }
          }
      },
      {
        title: <p>Upload <span>Mbps</span></p>,
        dataIndex: 'medianUpload',
        key: 'medianUpload',
        render: (upload, record) => {
            if (upload) {
                return (
                    <>
                      <span>{upload.toFixed(1)}</span>
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
                      <span>{download.toFixed(1)}</span>
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
                      <span>{latency.toFixed(1)}</span>
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
                    <span>{jitter.toFixed(1)}</span>
                  </>
                )
            } else {
              return <Tag key='jitter'>--</Tag>
            }
          }
      }
    ]

  return (
    <SectionContent>
        <h2 className={styles.title}>Your Results</h2>
        <Table
          dataSource={history}
          columns={columns}
          className={styles.historyTable}
          rowKey='id'
          bordered
          pagination={{
            pageSize: 10,
          }}
          showSorterTooltip={false}
          scroll={{ x: 'max-content' }}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                navigate(`/result/${record.id}`)
              }
            }
          }}
        />
    </SectionContent>
  )    
}

export default HistoryTable