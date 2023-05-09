import React from 'react'
import { Radio } from 'antd'

import RSTCard from '../../common/Card/RSTCard'
import ChecklistAnswerOption from '../../RST/ChecklistAnswerOption'
import { useCommunityContext } from '../../context/CommunityContext'

import styles from './RSTSameSetup.module.css'

const RSTSameSetup = () => {
  const { setSameSetupAns, setSameSetup, setRunTest } = useCommunityContext()
  const handleClick = (value) => {
    setSameSetupAns(value)
    setSameSetup(false)
    if (value) setRunTest(true)
  }
  return (
    <div className={styles.sameSetupWrap}>
      <RSTCard
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
      </RSTCard>
    </div>
  )
}

export default RSTSameSetup
