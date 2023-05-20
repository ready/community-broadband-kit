import React from 'react'
import { Form } from 'antd'
import SurveyStepper from 'components/common/Survey/SurveyStepper'
import { noServiceSurvey } from 'utils/constants'

const NoServiceForm = ({ form, currentStep, handleChange }) => {
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
        steps={noServiceSurvey}
        currentStep={currentStep}
      />
    </Form>
  )
}

export default NoServiceForm