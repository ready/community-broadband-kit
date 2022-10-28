const express = require('express');
const router = express.Router();
const  sgMail = require('@sendgrid/mail')
const { Client } = require('@notionhq/client')

require("dotenv").config()

const notion = new Client({
  auth: process.env.NOTION_KEY
})

router.post('/addEmail',sendEmail)

async function sendEmail (req, res) {
  sgMail.setApiKey(process.env.SENDGRID_KEY)
	if (req.method !== 'POST') {
			return res
				.status(405)
				.json({ message: `${req.method} requests are not allowed` })
	}
  try {
    const email = req.body.email
    // Slack notification 
    const webHookURL = 'https://hooks.slack.com/services/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'
		const data1 = {
			text: `you have a new email subscription.
							email: "${email}",
							`
		}
		const env = 'local'
		let is_test = true
		if (env === 'prod') {
			is_test = 'No'
		} else {
			is_test = 'Yes'
		}
		await notion.pages.create({
			parent: {
				database_id: '3dfab6ad24ad4070bed7e78846b3a0df'
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
				}

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

module.exports = router;