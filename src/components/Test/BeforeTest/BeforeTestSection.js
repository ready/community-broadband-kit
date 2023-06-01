import React, { useState } from 'react'
import NoServiceSurvey  from 'components/common/BeforeWeBegin/NoService/NoServiceSurvey'
import styles from './BeforeTestSection.module.css'
import ChecklistCard from '../../common/BeforeWeBegin/Checklist/ChecklistCard'
import AddressCard from 'components/common/BeforeWeBegin/Address/AddressCard'
import { useToolkitContext } from 'components/common/Context/ToolkitContext'

const BeforeTestSection = ({ setParentDisplay }) => {
  const [currentDisplay, setCurrentDisplay] = useState('address-input')

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