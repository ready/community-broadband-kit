import sgMail from '@sendgrid/mail'
const { Client } = require('@notionhq/client')

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_KEY
})
// this is for all contact button apis
export default async function handler (req, res) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ message: `${req.method} requests are not allowed` })
  }
  const {
    name,
    email,
    phone,
    title,
    isTribalMember,
    isISP,
    isConsultant,
    interestedInACP,
    insterestedInOfferService
  } = JSON.parse(req.body)
  sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_KEY)
  // slack notification thing
  const webHookURL = 'https://hooks.slack.com/services/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'
  const data1 = {
    text: `you have a new tribal applicant.
        name:  "${name}",
        email: "${email}",`
  }

  try {
    const env = process.env.NEXT_PUBLIC_ENVIORNMENT
    let is_test = ''
    if (env === 'prod') {
      is_test = 'No'
    } else {
      is_test = 'Yes'
    }

    const name1 = name || ''
    const email1 = email || ''
    const phone1 = phone || ''
    const title1 = title || ''
    const isTribalMember1 = isTribalMember || false
    const isISP1 = isISP || false
    const isConsultant1 = isConsultant || false
    const interestedInACP1 = interestedInACP || false
    const insterestedInOfferService1 = insterestedInOfferService || false
    const first_name = name.split(' ')?.[0]

    await notion.pages.create({
      parent: {
        database_id: 'a81932c5cf5940409914f674e5edb394'
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: name1
              }
            }
          ]
        },
        Email: {
          // email1
          rich_text: [
            {
              text: {
                content: email1
              }
            }
          ]
        },
        isTribalMember: {
          checkbox: isTribalMember1
        },
        isISP: {
          checkbox: isISP1
        },
        isConsultant: {
          checkbox: isConsultant1
        },
        interestedInACP: {
          checkbox: interestedInACP1
        },
        insterestedInOfferService: {
          checkbox: insterestedInOfferService1
        },
        phone: {
          rich_text: [
            {
              text: {
                content: phone1
              }
            }
          ]

        },
        Title: {
          rich_text: [
            {
              text: {
                content: title1
              }
            }
          ]
        },
        is_test: {
          select: {
            name: is_test
          }
        }
      }

    })
    const content = {
      to: email,
      // bcc: process.env.READY_SL ACK_ADDRESS,
      cc: ['welcome@broadband.money', 'sdinsmore@broadband.money'],
      from: {
        email: 'welcome@broadband.money',
        name: 'Broadband.Money'
      },
      dynamic_template_data: {
        email,
        firstName: first_name
      },
      template_id: 'd-27a6252236b0464eaff3bdb315f65a86'
    }
    await sgMail.send(content)
    const results = await fetch(webHookURL, {
      method: 'post',
      body: JSON.stringify(data1)
    }, {
      withCredentials: false,
      transformRequest: [(data1, headers) => {
        delete headers.post['Content-Type']
        return data1
      }]
    })

    res.status(201).json({ error: null, msg: 'Successsend to notion ' })
  } catch (error) {
    res.status(500).json({ error, msg: 'There was an error' })
  }
}
