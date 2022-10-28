/**
 * Signs client up for a email subscription to bbm newsletter
 */
const sendEmailSubscription = async () => {
  // use api to send info to prisma db
  const email = await document.getElementById('email').value
  const results = await fetch(`${window.location.origin}/addEmail`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({email:email})
  })
  const { error, msg } = await results.json()
  if (error) {
    console.log('error msg', error)
  } else {
    console.log('success adding user status',msg)
  }
}

/**
 * Signs client up for a reminder email to take the test
 */
const sendEmailReminder = async () => {
  // use api to send info to prisma db
  const email = await document.getElementById('remind-email').value
  document.getElementById('remind-email').value = ''
  const results = await fetch(`${window.location.origin}/emailReminder`, {
    method: 'post',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({email:email})
  })
  const { error, msg } = await results.json()
  if (error) {
    console.log('error msg', error)
  } else {
    console.log('success adding email reminder',msg)
  }
}

window.sendEmailReminder = sendEmailReminder
window.sendEmailSubscription = sendEmailSubscription