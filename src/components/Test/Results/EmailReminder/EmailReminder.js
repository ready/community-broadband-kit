import React, { useState } from 'react'
import { Spin } from 'antd'
import styles from './RemindEmail.module.css'

const RemindEmail = () => {
  const [email, setEmail] = useState()
  const [loading, setLoading] = useState(false)

  const sendEmail = async () => {
    setLoading(true)
    const results = await fetch(`/emailReminder`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({email, url: window?.location?.href}),
    })

    const { error, msg } = await results.json()
    setLoading(false)
    if (error) {
      console.log('error msg', error)
    } else {
      console.log('success adding user status', msg)
      setEmail('Thank you for subscribing!')
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
                value={email}
                onChange={e => setEmail(e.target.value)}
              />}
          <button className={styles.button} onClick={sendEmail}>Remind me</button>
      </div>
    </div>
  )
}

export default RemindEmail
