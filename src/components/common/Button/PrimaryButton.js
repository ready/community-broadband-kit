import React from 'react'
import { Button } from 'antd'

import styles from './PrimaryButton.module.css'

const PrimaryButton = ({ size, buttonTitle, onClick, disabled, image }) => {
  return (
    <Button
      type='primary'
      size='large'
      className={`${styles.takeTest} ${styles[size]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {buttonTitle}{image}
    </Button>
  )
}

export default PrimaryButton
