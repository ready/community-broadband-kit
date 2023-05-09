import React from 'react'
import { Form } from 'antd'
import SurveyStepper from './SurveyStepper'
import { survey } from '../../utils/constants'

const RSTForm = ({ form,currentStep,handleChange }) => {

  return (
    <Form
      form={form}
      size='large'
      layout='vertical'
      onValuesChange={(values) => {
        const keys = Object.keys(values)
        for (const key of keys) {
          let val = values[key]
          // convert to boolean
          if (['true', 'false'].includes(val)) {
            val = val === 'true'
          }
          handleChange(val, key)
        }
      }}
    >
      <SurveyStepper
        steps={survey}
        currentStep={currentStep}
      />
    </Form>
  )
}

export default RSTForm