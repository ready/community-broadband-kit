import React, { useState } from 'react'
import { Steps, Checkbox } from 'antd'

import RSTCard from '../../common/Card/RSTCard'
import ChecklistContent from '../../RST/ChecklistContent'
import RSTButton from '../../RST/RSTButton'
import AddressAutoComplete from '../../RST/AddressAutoComplete'
import { useCommunityContext } from '../../context/CommunityContext'
import RSTNoServiceSurvey  from '../../RST/RSTNoServiceSurvey'
import SectionRightContent from '../../common/SectionContent/SectionRightContent'
import styles from './RSTBeforeTestSection.module.css'


const RSTBeforeTestSection = ({ setRunTest }) => {
  const {toolkitData, setToolkitData, config} = useCommunityContext()
  const [enterAddress, setEnterAddress] = useState(false)
  const [noService, setNoService] = useState(false)
  const [step, setStep] = useState(0)
  
  const handleClick = () => {
    setToolkitData({
      ...toolkitData,
      connectionType: toolkitData?.connectionType ? toolkitData?.connectionType : '',
      vpnOff: toolkitData?.vpnOff ? toolkitData?.vpnOff : null,
      noInterruptFromOtherDevices: toolkitData?.noInterruptFromOtherDevices ? toolkitData?.noInterruptFromOtherDevices : null
    })
    setRunTest(true)
  }

  const next = () => {
    setStep(step + 1)
  }

  async function submitAddress(){
    setEnterAddress(true)
    if (toolkitData.noService === true) {
      setNoService(true)
    }
  }
    
  const checklist = ['internet', 'vpn', 'interruption', 'information']

  const items = checklist?.map((item) => ({
    key: item.content,
  }))


  return (
    <div className={styles.beforeTestWrap}>
      {!enterAddress &&
        <RSTCard
          title='Before We Begin...'
          description='Your location is required to help Mississippi get better internet. Please enter your address below. It will not be shared with the public.'
        >
          <AddressAutoComplete />
          <p className={styles.beforeTestDescription}>
            If you are reporting that you have no internet at home from a different location, enter in your home address and select the option below.
          </p>
          <Checkbox
            className={styles.checkInternet}
            onChange={(e) => setToolkitData({...toolkitData, noService: e.target.checked})
          }
          >
            I do not have internet service at this address
          </Checkbox>
          <div className={styles.beforeTestButtonWrap}>
            <RSTButton
              buttonTitle='Next'
              onClick={() => submitAddress()}
              disabled={ !toolkitData.address && config?.isAddressRequired }
            />
          </div>
        </RSTCard>}
      {noService &&
          <SectionRightContent>
            <RSTNoServiceSurvey />
          </SectionRightContent>}
      {enterAddress && !noService &&
        <RSTCard
          title='Before We Begin...'
          description='For best results, we recommend taking the following steps. Please select a step if it has been done. Hover over underlined terms for additional information.'
        >
          <Steps className={styles.beforeTestSteps} current={step} items={items} responsive={false} />
          <ChecklistContent
            currentChecklist={checklist[step]}
          />
          <div className={styles.beforeTestButtonWrap}>
            <RSTButton
              buttonTitle={step === Object.keys(checklist)?.length - 1 ? 'Start test' : 'Next'}
              onClick={step === Object.keys(checklist)?.length - 1 ? () => handleClick() : () => next()}
            />
          </div>
        </RSTCard>}
    </div>
  )
}

export default RSTBeforeTestSection