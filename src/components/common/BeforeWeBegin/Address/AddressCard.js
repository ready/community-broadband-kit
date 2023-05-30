import React, { useEffect, useState } from 'react'
import AddressAutoComplete from './AddressAutoComplete'
import { Checkbox } from 'antd'
import PrimaryButton from 'components/common/Button/PrimaryButton'
import StepCard from 'components/common/Card/StepCard'
import { useToolkitContext } from 'components/common/Context/ToolkitContext'
import styles from './AddressCard.module.css'

const AddressCard = ({ onClick }) => {
  const [noService, setNoService] = useState(false)
  const { config, metadata } = useToolkitContext()

  return (
    <div className={styles.beforeSurveyWrap}>
      <StepCard
        title='Before We Begin...'
        description='Your location is required to help your community get better internet. Please enter your address below. It will not be shared with the public.'
      >
        <AddressAutoComplete />
        <p className={styles.beforeSurveyDescription}>
          If you are reporting that you have no internet at home from a different location, enter in your home address and select the option below.
        </p>
        <Checkbox
          className={styles.checkInternet}
          onChange={(e) => setNoService(e.target.checked)
        }
        >
          I do not have internet service at this address
        </Checkbox>
        <div className={styles.surveyButton}>
          <PrimaryButton
            buttonTitle='Next'
            size='big'
            onClick={() => { onClick(noService) }}
            disabled={ !metadata.address && config?.isAddressRequired }
          />
        </div>
      </StepCard>
    </div>
  )
}

export default AddressCard