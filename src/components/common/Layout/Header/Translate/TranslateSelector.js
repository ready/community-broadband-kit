import React, { useState } from 'react'

import { SearchOutlined, TranslationOutlined } from '@ant-design/icons'
import { Select } from 'antd'

import { useTranslateContext } from '../../../Context/TranslateProvider'
import { Languages } from '../../../Context/TranslateProvider'

import styles from './TranslateSelector.module.css'

/**
 * Renders a selector that automatically updates the language
 * of the entire website when the user changes it
 */
const TranslateSelector = () => {
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(false)
  const openClass = open ? styles.translateSelectorOpen : ''
  const { language, setLanguage } = useTranslateContext()

  return (
    <div className={`${styles.translateSelector} notranslate ${openClass}`}>
      <Select
        suffixIcon={hover ? <SearchOutlined /> : <TranslationOutlined />}
        value={language}
        style={{ width: '100%' }}
        className={`notranslate ${openClass}`}
        onChange={lang => setLanguage(lang)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        showSearch
        onDropdownVisibleChange={open => setOpen(open)}
        filterOption={(input, option) => {
          const shortcode = (option?.value ?? '').toLowerCase()
          const name = (option?.children ?? '').toLowerCase()
          const search = input.toLowerCase()
          return shortcode.includes(search) || name.includes(search)
        }}
      >
        {
          Object.keys(Languages).map((langCode, i) => (
            <Select.Option key={i} value={langCode} className='notranslate' style={{ width: '100%' }}>
              {Languages[langCode]}
            </Select.Option>
          ))
        }
      </Select>
    </div>
  )
}

export default TranslateSelector