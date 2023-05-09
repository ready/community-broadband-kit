import React from 'react'
import { Radio, Select } from 'antd'

import styles from '../components/RST/InputType.module.css'

const useInputType = ({
  inputType = '',
  selectOptions = []
}) => {
  switch (inputType) {
    case 'radio':
      return (
        <Radio.Group className={styles.radio}>
            {selectOptions.map((option, index) => (
              <Radio
                key={index}
                value={option}
                className={styles.radioOption}
              >
                {option}
              </Radio>
            ))}
        </Radio.Group>
      )
    case 'select':
      return (
        <Select placeholder={selectOptions?.[0]}>
          {selectOptions?.slice(1).map((option, index) => (
            <Select.Option key={index} value={option}>{option}</Select.Option>
          ))}
        </Select>
      )
    default:
  }
}

export default useInputType
