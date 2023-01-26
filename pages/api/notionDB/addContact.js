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
  const { name, email, message,url } = JSON.parse(req.body)
  sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_KEY)
  // slack notification thing
  const webHookURL = 'https://hooks.slack.com/services/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'
  const data1 = {
    text: `you have a new contact.
        name:  "${name}",
        email: "${email}",
        message: "${message}",
        url: "${url}",
        `
  }

  try {
    const env = process.env.NEXT_PUBLIC_ENVIORNMENT
    let is_test = ''
    if (env === 'prod') {
      is_test = 'No'
    } else {
      is_test = 'Yes'
    }

    await notion.pages.create({
      parent: {
        database_id: process.env.NEXT_PUBLIC_NOTION_DBContact_ID
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
      // bcc: process.env.READY_SL ACK_ADDRESS,
      cc: ['welcome@broadband.money'],
      from: {
        email: 'welcome@broadband.money',
        name: 'Broadband.Money'
      },
      dynamic_template_data: {
        email,
        name,
        message
      },
      template_id: 'd-6a241e654f0d48418f996e741909ad07'
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
