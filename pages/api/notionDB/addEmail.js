import sgMail from '@sendgrid/mail'

const { Client } = require('@notionhq/client')

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_KEY
})
// this is for get email alert api
export default async function handler (req, res) {
  sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_KEY)
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ message: `${req.method} requests are not allowed` })
  }
  try {
    const { email,url } = JSON.parse(req.body)
    // slack notification thing
    const webHookURL = 'https://hooks.slack.com/services/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'
    const data1 = {
      text: `you have a new email subscription.
              email: "${email}",
              url: "${url}",
             `
    }
    const env = process.env.NEXT_PUBLIC_ENVIORNMENT
    let is_test = true
    if (env === 'prod') {
      is_test = 'No'
    } else {
      is_test = 'Yes'
    }
    await notion.pages.create({
      parent: {
        database_id: process.env.NEXT_PUBLIC_NOTION_DBEmail_ID
      },
      properties: {
        Email: {
          title: [
            {
              text: {
                content: email
              }
            }
          ]
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
        email
      },
      template_id: 'd-2b5c88a2205c4814a35573386939a013'
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
    res.status(201).json({ error: null, msg: 'Success send to notion ' })
  } catch (error) {
    res.status(500).json({ error, msg: 'There was an error' })
  }
}
