import React, { useState } from 'react'
import NoServiceSurvey  from '../../common/NoService/NoServiceSurvey'
import styles from './BeforeTestSection.module.css'
import ChecklistCard from './Checklist/ChecklistCard'
import AddressCard from '../../common/Address/AddressCard'
import { useToolkitContext } from '../../common/Context/ToolkitContext'

const BeforeTestSection = ({ setParentDisplay }) => {
  const [currentDisplay, setCurrentDisplay] = useState('address-input')
  const { metadata, setMetadata } = useToolkitContext()

  const renderSection = () => {
    switch (currentDisplay) {
      case 'address-input':
        return <AddressCard onClick={(noService) => { 
          noService ? setCurrentDisplay('no-service') : setCurrentDisplay('checklist')
        }}/>
      case 'no-service':
        return <NoServiceSurvey />
      case 'checklist':
        return <ChecklistCard onClick={() => {
          setMetadata({
            ...metadata,
            connectionType: metadata?.connectionType || '',
            vpnOff: metadata?.vpnOff || null,
            noInterruptFromOtherDevices: metadata?.noInterruptFromOtherDevices || null
          })
          setParentDisplay('testing')
        }} />
      default:
        return <></>
    }
  }

  return (
    <div className={styles.beforeTestWrap}>
      {renderSection()} 
    </div>
  )
}

export default BeforeTestSection