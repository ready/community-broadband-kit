import React from 'react';
import { Form } from 'antd';
import styles from './AddressAutoComplete.module.css'
import { useCommunityContext } from '../context/CommunityContext'

const PhoneNumberEntry = () => {

  const [form] = Form.useForm()
  const { surveyData, setSurveyData } = useCommunityContext()

  return (
    <Form
    form={form}
    className={styles.address}
    >
        <Form.Item
        name='phone'
        validateTrigger='onBlur'
        validateFirst
        rules={[
            { required: true, message: 'This field is required to continue' }
        ]}
        required={true}
        >
        <input
            type='basic'
            id='phoneNumber'
            className='ant-input ant-input-lg'        
            onChange={(e) => setSurveyData({...surveyData, phoneNumber: e.target.value})}ui
            placeholder='Enter a phone number'
            onKeyDown={(e) => {
            if (e.keyCode === 13) {
                e.preventDefault()
            }
            }}
        />
        </Form.Item>
    </Form>
  )
}
export default PhoneNumberEntry;