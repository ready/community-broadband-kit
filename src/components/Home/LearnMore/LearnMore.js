import React, { useState } from 'react'
import { ArrowRightOutlined } from '@ant-design/icons'
import styles from './LearnMore.module.css'
import { Link } from 'react-router-dom'

const LearnMore = () => {
  const [showButton, setShowButton] = useState(true)
  
  return (
    <div
      className={styles.learnMore}
      style={{
        display: showButton ? 'flex' : 'none'
      }}
    >
      <div className={styles.atag}>
        <Link to='/#info' onClick={() => setShowButton(false)}>
          Learn More <ArrowRightOutlined />
        </Link>
      </div>
    </div>
  )
}

export default LearnMore
