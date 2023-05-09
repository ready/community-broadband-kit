import React, { useState } from 'react'
import { Spin } from 'antd'
import styles from './RemindEmail.module.css'

const RemindEmail = () => {
  const [email, setEmail] = useState()
  const [loading, setLoading] = useState(false)

  const sendEmail = async () => {
    setLoading(true)
    const results = await fetch(`/remindEmail`, {
      method: 'post',
      body: JSON.stringify({email,domainName:window?.location?.hostname || 'broadbandms.com',url:window?.location?.href}),// how to get domainName
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

  const [allow, setAllow] = useState(true)

  const allowToSendEmail = () => {
    if (typeof allow === 'undefined') {
      setAllow(true)
    }
    if (allow && email) {
      setAllow(false)
    } else if (allow) {
      console.log('send email')
    } else {
      setAllow(true)
    }
  }

  return (
    <div className={styles.newsLetterContainer}>
      {allow
        ? <div className={styles.buttonContainer}>
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
          <button className={styles.button} onClick={sendEmail}>Get alerts</button>
          </div>
        : <>
          <p
            className={styles.textLink}
            onClick={allowToSendEmail}
          >
            Get alerts
          </p>
        </>}

    </div>
  )
}

export default RemindEmail
