import React from 'react'
import { ArrowRightOutlined } from '@ant-design/icons'

import styles from './LearnMore.module.css'
import { useEnableScroll } from '../../context/ScrollContext'

// clicking learn more will remove the margin from hero section and also allow scroll, and overflow
const LearnMore = () => {
  const [scroll, setScroll] = useEnableScroll()
  const handleClick = (e) => {
    e.preventDefault()
    setScroll(true)
  }
  return (
    <div
      className={styles.learnMore}
      style={{
        display: scroll ? 'none' : 'flex'
      }}
    >
      <a href='#' onClick={(e) => handleClick(e)}>
        <div className={styles.atag}>
          Learn More <ArrowRightOutlined />
        </div>
      </a>
    </div>
  )
}

export default LearnMore
