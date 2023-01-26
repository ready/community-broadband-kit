import React from 'react'
import { Form } from 'antd'

import useInputType from '/utils/useInputType'

const SurveyFormItem = ({ question }) => {
  return (
    <Form.Item
      name={question?.attribute}
      label={question?.question}
      validateFirst={false}
      validateTrigger='onBlur'
    >
      {useInputType({
        inputType: question?.type,
        selectOptions: question?.answers
      })}
    </Form.Item>
  )
}

export default SurveyFormItem
