import React, { useEffect, useState } from 'react'
import qs from 'qs'
import { Radio, Checkbox } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import Tooltip from './Tooltip/Tooltip'
import ChecklistAnswerOption from './ChecklistAnswerOption'
import styles from './ChecklistContent.module.css'
import { useToolkitContext } from '../../../common/Context/ToolkitContext'

const ChecklistContent = ({ currentChecklist }) => {
  const [term, setTerm] = useState([])
  const { metadata, setMetadata } = useToolkitContext()
  
  const query = qs.stringify({
    filters: {
      slugUID: {
        $in: ['ethernet-cable', 'wifi-router']
      }
    }
  }, {
    encodeValuesOnly: true
  })

  useEffect(() => {
    async function fetchStrapiDefinition() {
      const res = await fetch(
        `https://api.broadband.money/api/broadband-grant-terms?${query}`
      )
      const terms = await res.json()
  
      setTerm(terms?.data)
    }
    fetchStrapiDefinition()
  }, [])

  const handleOnChange = (field, value) => {
    setMetadata({...metadata, [field]: value})
  }

  const checklist = {
    internet: (
      <div className={styles.checklistQuestion}>
        <p className={styles.checklistHeader}>
          How are you connected to the Internet?
        </p>
        <div className={styles.checklistSubheader}>A&nbsp;
          <Tooltip
            tooltipKeyword='wired'
            tooltipText={
              <div className={styles.tooltipText}>
                {term?.[0]?.attributes?.definition?.replace(/<[^>]+>/g, '')?.replace(/&nbsp;/g, ' ')}
                <img className={styles.ethernetImage} src='/images/ethernet.png' alt='ethernet' />
                <a href="https://www.wikihow.com/Connect-to-Ethernet-on-PC-or-Mac" target="_blank" rel="noreferrer">
                  See here for more details <ArrowRightOutlined />
                </a>
              </div>
            }
          />
          &nbsp;connection is preferred.
        </div>
        <Radio.Group
          className={styles.answerOptions}
          onChange={(e) => handleOnChange('connectionType', e.target.value)}
        >
          <ChecklistAnswerOption
            imgSrc='/images/wired_icon.png'
            imgAlt='Wired-icon'
            optionText='Wired'
            optionValue={'Ethernet'}
          />
          <ChecklistAnswerOption
            imgSrc='/images/wifi_icon.png'
            imgAlt='Wired-icon'
            optionText='WiFi'
            optionValue={'WiFi'}
          />
          <ChecklistAnswerOption
            imgSrc='/images/cellular_icon.png'
            imgAlt='Cellular-icon'
            optionText='Cellular'
            optionValue={'Cellular'}
          />
        </Radio.Group>
        {metadata?.connectionType?.includes('WiFi') &&
          <div className={styles.routerWarning}>
            <Checkbox name='close-to-router' value='WiFi (close to router)' onChange={(e) => handleOnChange('connectionType', e.target.value)}>
              <div className={styles.closeToRouter}>
                I am as close as possible to my&nbsp;
                <Tooltip
                  tooltipKeyword='Wi-Fi router'
                  tooltipText={
                    <div className={styles.tooltipText}>
                      {term?.[1]?.attributes?.definition?.replace(/<[^>]+>/g, '')?.replace(/&nbsp;/g, ' ')}
                      <img className={styles.ethernetImage} src='/images/router.png' alt='router' />
                    </div>
                  }
                />
              </div>
            </Checkbox>
          </div>}
      </div>
    ),
    vpn: (
      <div className={styles.checklistQuestion}>
        <div className={`${styles.checklistHeader} ${styles.vpnChecklist}`}>
          Are you connected to a&nbsp;
          <Tooltip
            tooltipKeyword='VPN'
            tooltipText={
              <div className={styles.tooltipText}>
                VPN stands for &quot;Virtual Private Network.&quot; If you are unaware of what this means then you are ready to take the test.
              </div>
            }
          />
          ?
        </div>
        <div className={styles.checklistSubheader}>If so, please disconnect. If you are unsure, select No</div>
        <Radio.Group
          className={styles.answerOptions}
          onChange={(e) => handleOnChange('vpnOff', e.target.value)}
        >
          <ChecklistAnswerOption
            imgSrc='/images/vpn_icon.png'
            imgAlt='vpn icon'
            optionText='Yes'
            optionValue={true}
          />
          <ChecklistAnswerOption
            imgSrc='/images/cross_icon.png'
            imgAlt='cross icon'
            optionText='No'
            optionValue={false}
          />
        </Radio.Group>
      </div>
    ),
    interruption: (
      <div className={styles.checklistQuestion}>
        <p className={styles.checklistHeader}>
          Is anyone on your network currently on a video call, streaming videos, or gaming?
        </p>
        <Radio.Group
          className={styles.answerOptions}
          onChange={(e) => handleOnChange('noInterruptFromOtherDevices', e.target.value)}
        >
          <ChecklistAnswerOption
            imgSrc='/images/streaming_icon.png'
            imgAlt='streaming icon'
            optionText='Yes'
            optionValue={true}
          />
          <ChecklistAnswerOption
            imgSrc='/images/cross_icon.png'
            imgAlt='cross icon'
            optionText='No'
            optionValue={false}
          />
        </Radio.Group>
      </div>
    ),
    information: (
      <div className={styles.checklistQuestion}>
        <p className={styles.checklistHeader}>
          Please have information about your tier of internet service in order to complete survey questions.
        </p>
      </div>
    )
  }

  return (
    <>
      {checklist?.[currentChecklist]}
    </>
  )
}

export default ChecklistContent