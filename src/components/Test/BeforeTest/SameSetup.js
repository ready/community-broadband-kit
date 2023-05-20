import React from 'react'
import { Radio } from 'antd'
import StepCard from 'components/common/Card/StepCard'
import ChecklistAnswerOption from '../../common/BeforeWeBegin/Checklist/ChecklistAnswerOption'
import styles from './SameSetup.module.css'
import { useToolkitContext } from 'components/common/Context/ToolkitContext'

const SameSetup = ({ setCurrentDisplay }) => {
  const {
    previousResults,
    metadata,
    setMetadata
  } = useToolkitContext

  const handleClick = (value) => {
    if (value) {
      setMetadata({
        ...metadata,
        address: previousResults?.address,
        addressLat: previousResults?.addressLat,
        addressLon: previousResults?.addressLon,
        connectionType: previousResults?.connectionType,
        vpnOff: previousResults?.vpnOff,
        noInterruptFromOtherDevices: previousResults?.noInterruptFromOtherDevices,
      })
      setCurrentDisplay('testing')
    } else {
      setCurrentDisplay('before-test')
    }
  }

  return (
    <div className={styles.sameSetupWrap}>
      <StepCard
        title='Is your setup the same as last time?'
        description='If your set up has changed from the previous time, for example you are now using WiFi instead of a wired connection, select "No".'
      >
        <Radio.Group
          className={styles.answerOptions}
          onChange={(e) => handleClick(e.target.value)}
        >
          <ChecklistAnswerOption
            imgSrc='/images/checkmark_icon.png'
            imgAlt='checkmark icon'
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
      </StepCard>
    </div>
  )
}

export default SameSetup
