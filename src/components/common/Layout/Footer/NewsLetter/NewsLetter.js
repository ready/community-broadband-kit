import React, { useState } from 'react'
import { Spin } from 'antd'
import styles from './NewsLetter.module.css'

const NewsLetter = ({ header }) => {
  const [email, setEmail] = useState({})
  const [loading, setLoading] = useState(false)

  const sendEmail = async () => {
  // use api to send info to prisma db
    setLoading(true)
    const results = await fetch('/addEmail', {
      method: 'post',
      body: JSON.stringify(email)
    })

    const { error, msg } = await results.json()
    setLoading(false)
    if (error) {
      console.log('error msg', error)
    } else {
      console.log('success adding user status', msg)
      setEmail('Thank you for subscribing!')
      //if (header) { setTimeout(() => setAllow(false), 3000) }
    }
  }

  return (
    <div className={styles.newsLetterContainer}>
      <div className={styles.buttonContainer}>
        {loading
          ? <div>
            <Spin />
            </div>
            : <input
                type='email'
                id='email'
                className={styles.input}
                placeholder='Enter email'
                value={email?.email}
                onChange={e => setEmail({url:window?.location?.href, email:e.target.value})}
              />}
          <button className={styles.button} onClick={sendEmail}>Get alerts</button>
       </div>
    </div>
  )
}

export default NewsLetter