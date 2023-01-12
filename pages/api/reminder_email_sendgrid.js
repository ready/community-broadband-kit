const moment = require('moment-timezone')
const sgMail = require('@sendgrid/mail')
const { Client } = require('@notionhq/client')
const fetch = require('node-fetch')
const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_KEY
})
// this fetch data from notion table and send out email via sendgrid
const sendEmailSendGrid = async (req, res) => {
  sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_KEY)
  try {
    let cursor = undefined
    let pages = []


    while (true) {
    const { results, next_cursor } = await notion.databases.query({ database_id: 'ac617c53d57f4ef2a4ece0ba6c88a036',start_cursor: cursor, })
    pages.push(...results)
      if (!next_cursor) {
        break
      }
      cursor = next_cursor
    }
    // get partial data
    pages.map(async (invitee, index) => {
      const email = invitee?.properties?.Email?.title[0]?.text?.content
      const domainName = invitee?.properties?.domainName?.rich_text[0]?.text?.content
      const fromEmail = invitee?.properties?.fromEmail?.rich_text[0]?.text?.content
      const fromName = invitee?.properties?.fromName?.rich_text[0]?.text?.content
      
      let created_at
      if (invitee?.properties?.created_at?.created_time) {
        created_at = invitee.properties.created_at.created_time
      } else {
        created_at = null
      }

      const domainAssets = await getAssets(domainName)
      const create_time = moment(created_at)
      const now_time = moment()
      const diff_days = moment.duration(now_time.diff(create_time)).asDays()
      const bodyContent =
      `Thank you for helping ${domainAssets.communityName || 'Broadband.money'} get better broadband! \nThis is a reminder to take the broadband performance test. \nFor best results, take the test once per day over the course of a week.`

      if ( 1>diff_days%5 && diff_days%5 >=0 && create_time!==now_time) {
      // cc: ['welcome@broadband.money'],
      const content = {
        to: {
          email
          // email:"chiaan2844@gmail.com",
        },
        bcc: ['chia@ready.net','welcome@broadband.money'],
        from: {
          email: fromEmail,
          name:  fromName
        },
        dynamic_template_data: {
          email,
          content: bodyContent,
          orgName: domainAssets.communityName || 'Broadband.money', // need to be dynamic
          orgLogo: domainAssets.communityName !== 'Broadband.Money' ? domainAssets.logo : 'https://storage.googleapis.com/bbm-public-bucket/BBM_marker_180_be6969d3b9.png?updated_at=2022-03-02T22:23:36.490Z', // need to be dynamic : `https://api.broadband.money${config.logo.data.attributes.url}`||
          ctaUrl: domainAssets.domainName ? `https://${domainAssets.domainName}/` : 'https://toolkit.broadband.money/'
        },
        template_id: 'd-b6ff88ca5c6a49b69c8c654c89417485'
      }
      // console.log('before send email')
      await sgMail.send(content)
      // console.log('after send email')
      }

    })
    res.status(201).json({ msg: 'Success automate cronjob ' })
  } catch (error) {
    console.log('error: ', error)
  }
}

export default sendEmailSendGrid

async function getAssets (domain = 'toolkit.broadband.money') {
  const body = JSON.stringify({
    query: `query {
            getCommunityApplicationsByDomain(domainName:"${domain}") {
                organization {
                    id
                }
                communityName
                logo
                headerTitle
                heading
                description
                themeColor
                ogTitle
                ogImage
                ogDescription
                logoWidth
                domainName
                organization {
                    id
                }
            }
        }`
  })

  return fetch('https:/api.ready.net/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
    .then(res => res.json())
    .then(result => {
      return result.data.getCommunityApplicationsByDomain[0]
    })
    .catch(err => console.log(err))
}
