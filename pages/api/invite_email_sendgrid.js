const moment = require('moment-timezone')
const sgMail = require('@sendgrid/mail')
const { Client } = require('@notionhq/client')
const fetch = require('node-fetch')
const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_KEY
})
// const {STATES_DIC,space_id_name, STATES_DIC_OBJ}= require('./constants');
const sendEmailSendGrid = async (req, res) => {
  sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_KEY)
  try {
    const pages = []
    // get all data from notion funnel db
    const { results } = await notion.databases.query({ database_id: process.env.NEXT_PUBLIC_NOTION_DB_ID })
    pages.push(...results)
    // get partial data
    pages.map(async (invitee, index) => {
      const name = invitee.properties.name.rich_text[0].text.content
      const email = invitee.properties.email.email
      const states = invitee.properties.states.multi_select
      let applicant_type
      let ready_type
      let orgName
      let created_at
      if (invitee.properties.applicant_type.select) {
        applicant_type = invitee.properties.applicant_type.select.name
      } else {
        applicant_type = null
      }
      if (invitee.properties['READY assigned applicant_type'].select) {
        ready_type = invitee.properties['READY assigned applicant_type'].select.name
      } else {
        ready_type = null
      }
      if (invitee.properties.organization_name.title[0]) {
        orgName = invitee.properties.organization_name.title[0].text.content
      } else {
        orgName = null
      }
      if (invitee.properties.created_at.date) {
        created_at = invitee.properties.created_at.date.start
      } else {
        created_at = null
      }
      // const orgName = invitee.properties["organization_name"]?.title[0]?.text.content
      // const created_at = invitee.properties["created_at"]?.date?.start
      const create_time = moment(created_at)
      const now_time = moment()

      const diff_days = moment.duration(now_time.diff(create_time)).asDays()
      const first_name = name.split(' ')[0]

      if (diff_days >= 2 && diff_days < 3) {
        if (applicant_type === 'ruralCoop' || applicant_type === 'Local ISP' || applicant_type === 'localIsp' || applicant_type === 'localGovernment') {
          console.log('1index', index)
          console.log('1firstname', first_name)
          console.log('1name', name)
          console.log('1email ', email)
          console.log('1states ', states)
          console.log('1orgName ', orgName)
          console.log('1applicant_type', applicant_type)
          console.log('1ready_type ', ready_type)
          console.log('1applicant_type', applicant_type)

          const content = {
            to: {
              email,
              // email:"chiaan2844@gmail.com",
              name
            },
            bcc: ['chia@ready.net', 'elaine@ready.net'],
            // cc: ['chia@ready.net','elaine@ready.net','ffdirectory@ready.net'],
            from: {
              email: 'welcome@broadband.money',
              name: 'Broadband.Money'
            },
            dynamic_template_data: {
              firstName: first_name,
              fullName: name,
              email,
              orgName
            },
            template_id: 'd-ada1f2b20a5d4b25bf4dd9ee04527525'
            // template_id: 'd-f22d1faeb4a9489fbb28eb3c797d08ae',
          }
          console.log('before send email')
          await sgMail.send(content)
          console.log('after send email')
        } else if (applicant_type === 'broadbandConsultant' || ready_type === 'broadbandConsultant' || ready_type === 'hardware provider' || ready_type === 'software provider' || ready_type === 'Construction') {
          console.log('2index', index)
          console.log('2firstname', first_name)
          console.log('2name', name)
          console.log('2email ', email)
          console.log('2states ', states)
          console.log('2orgName ', orgName)
          console.log('2applicant_type', applicant_type)
          console.log('2ready_type ', ready_type)
          console.log('2applicant_type', applicant_type)
          const content = {
            to: {
              email,
              // email:"chiaan2844@gmail.com",
              name
            },
            bcc: ['chia@ready.net', 'elaine@ready.net'],
            // cc: ['chia@ready.net','elaine@ready.net','ffdirectory@ready.net'],
            from: {
              email: 'welcome@broadband.money',
              name: 'Broadband.Money'
            },
            dynamic_template_data: {
              firstName: first_name,
              fullName: name,
              email,
              orgName
            },
            // template_id: 'd-ada1f2b20a5d4b25bf4dd9ee04527525',
            template_id: 'd-f22d1faeb4a9489fbb28eb3c797d08ae'
          }
          console.log('before send email')
          await sgMail.send(content)
          console.log('after send email')
        } else {

        }
      }
    })
    res.status(201).json({ msg: 'Success automate cronjob ' })
  } catch (error) {
    console.log('error: ', error)
  }
}

// sendEmailSendGrid()
export default sendEmailSendGrid
