const express = require('express');
const router = express.Router();
const  sgMail = require('@sendgrid/mail')
const { Client } = require('@notionhq/client')
const getAssets = require('../utils/getAssets')

require("dotenv").config()

const notion = new Client({
	auth: process.env.NOTION_KEY
})

router.post('/emailReminder',sendEmailReminder)

async function sendEmailReminder (req, res) {
    const host = req.get('host')
    let config = await getAssets(host)
	if (!config) {
        config = await getAssets()
    }
	console.log("config",config.logo)
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
			text: `you have a new email reminder subscription.
							email: "${email}",
							`
		}
		// const env = 'local'
		// let is_test = true
		// if (env === 'prod') {
		// 	is_test = 'No'
		// } else {
		// 	is_test = 'Yes'
		// }
		await notion.pages.create({
			parent: {
				database_id: 'ac617c53d57f4ef2a4ece0ba6c88a036'
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

				domainName: {
					rich_text: [
					  {
						text: {
						  content: config.domainName
		  
						}
					  }
					]
				  },

			}

		})
		const bodyContent = 
		`Thank you for helping ${config.communityName||"Broadband.money"} get better broadband! \nThis is a reminder to take the broadband performance test. \nFor best results, take the test 8 times over the course of two weeks.`
		const content = {
			to: email,
			cc: ['welcome@broadband.money'],
			from: {
				email: 'noreply@broadband.money',
				name: `${config.communityName||"Broadband.money"} Broadband Toolkit`
			},
			dynamic_template_data: {
				email,
				content: bodyContent,
				orgName: config.communityName||"Broadband.money", // need to be dynamic
				orgLogo: config.communityName!=='Broadband.Money'?config.logo:'https://api.broadband.money/uploads/BBM_marker_180_be6969d3b9.png?updated_at=2022-03-02T22:23:36.490Z',// need to be dynamic : `https://api.broadband.money${config.logo.data.attributes.url}`||
				ctaUrl: config.domainName?`https://${config.domainName}/`:'https://toolkit.broadband.money/'
			},
			template_id: 'd-b6ff88ca5c6a49b69c8c654c89417485'
		}
    await sgMail.send(content)
    //   const results = await fetch(webHookURL, {
    //     method: 'post',
    //     body: JSON.stringify(data1)
    //   }, {
    //     withCredentials: false,
    //     transformRequest: [(data1, headers) => {
    //       delete headers.post['Content-Type']
    //       return data1
    //     }]
    //   })
      res.status(201).json({ error: null, msg: 'Success send to notion ' })
    } catch (error) {
      res.status(500).json({ error, msg: 'There was an error' })
    }
  
}

module.exports = router;