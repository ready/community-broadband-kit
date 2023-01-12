import sgMail from '@sendgrid/mail'
const { Client } = require('@notionhq/client')

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_KEY
})
// this is for all apis in [map].js button
export default async function handler (req, res) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ message: `${req.method} requests are not allowed` })
  }
  const { name, email, stateInterested, message, contactType,url } = JSON.parse(req.body)
  sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_KEY)
  // slack notification thing
  const webHookURL = 'https://hooks.slack.com/services/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'
  const data1 = {
    text: `you have a new state office contact.
          name:  "${name}",
          email: "${email}",
          state interested in :"${stateInterested}",
          message: "${message}",
          url: "${url}",
          `
  }
  const data2 = {
    text: `you have a new state office contact wants to report an error.
          name:  "${name}",
          email: "${email}",
          state interested in :"${stateInterested}",
          message: "${message}",
          url: "${url}",
          `
  }
  const data3 = {
    text: `you have a new state office contact wants to get more map info.
          name:  "${name}",
          email: "${email}",
          state interested in :"${stateInterested}",
          message: "${message}",
          url: "${url}",
          `
  }

  try {
    // define is_test based on env
    const env = process.env.NEXT_PUBLIC_ENVIORNMENT
    let is_test = ''
    if (env === 'prod') {
      is_test = 'No'
    } else {
      is_test = 'Yes'
    }

    await notion.pages.create({
      parent: {
        database_id: process.env.NEXT_PUBLIC_NOTION_DBStateOffice_ID
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: name
              }
            }
          ]
        },
        Email: {
          email
        },
        Message: {
          rich_text: [
            {
              text: {
                content: message

              }
            }
          ]
        },
        State_interested: {
          select: {
            name: stateInterested
          }
        },
        contactType: {
          select: {
            name: contactType
          }
        },
        is_test: {
          select: {
            name: is_test
          }
        },
        url: {
          rich_text: [
            {
              text: {
                content: url

              }
            }
          ]
        },
      }

    })
    const content = {
      to: email,
      cc: ['welcome@broadband.money'],
      from: {
        email: 'welcome@broadband.money',
        name: 'Broadband.Money'
      },
      dynamic_template_data: {
        email,
        name,
        message,
        stateInterested
      },
      template_id: 'd-6711ef84f4f2437b8009b571ddcd4717'
    }
    const contentMap = {
      to: email,
      cc: ['welcome@broadband.money'],
      from: {
        email: 'welcome@broadband.money',
        name: 'Broadband.Money'
      },
      dynamic_template_data: {
        email,
        name,
        message,
        stateInterested
      },
      template_id: 'd-833dcfd13fe7416a94ef0b6a6a7f3ea9'
    }

    let results
    if (contactType === 'isStateContact') {
      await sgMail.send(content)
      results = await fetch(webHookURL, {
        method: 'post',
        body: JSON.stringify(data1)
      }, {
        withCredentials: false,
        transformRequest: [(data1, headers) => {
          delete headers.post['Content-Type']
          return data1
        }]
      })
    } else if (contactType === 'isReportError') {
      await sgMail.send(content)
      results = await fetch(webHookURL, {
        method: 'post',
        body: JSON.stringify(data2)
      }, {
        withCredentials: false,
        transformRequest: [(data2, headers) => {
          delete headers.post['Content-Type']
          return data2
        }]
      })
    } else if (contactType === 'isInvestmentMapContact') {
      await sgMail.send(contentMap)
      results = await fetch(webHookURL, {
        method: 'post',
        body: JSON.stringify(data3)
      }, {
        withCredentials: false,
        transformRequest: [(data3, headers) => {
          delete headers.post['Content-Type']
          return data3
        }]
      })
    }

    res.status(201).json({ error: null, msg: 'Successsend to notion ' })
  } catch (error) {
    res.status(500).json({ error, msg: 'There was an error' })
  }
}
