import SectionContent from '../common/SectionContent/SectionContent'
import { Table, Tag } from 'antd'
import styles from './HistoryTable.module.css'

const HistoryTable = ({ history }) => {
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
      }
    ]

  return (
    <div className={styles.container}>
      <SectionContent>
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
          />
      </SectionContent>
    </div>
  )    
}

export default HistoryTable