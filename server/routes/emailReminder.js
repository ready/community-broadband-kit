const express = require('express');
const router = express.Router();
const { Client } = require('@notionhq/client')
const getConfig = require('../utils/getConfig')
const { DEFAULT_HOST } = require('../utils/constants')

const notion = new Client({
	auth: process.env.NOTION_KEY
})

router.post('/emailReminder', sendEmailReminder)

async function sendEmailReminder (req, res) {
	const host = req.get('host')
	
	let config = await getConfig(host)
	if (!config) {
    config = await getConfig(DEFAULT_HOST)
  }
	if (req.method !== 'POST') {
		return res
			.status(405)
			.json({ message: `${req.method} requests are not allowed` })
	}
  try {
		const { email, url } = req.body
		let fromEmail 

		if (config?.domainName === 'checknewarkinternetspeeds.org') {
			fromEmail  = 'noreply@checknewarkinternetspeeds.org'
		} else{
			fromEmail = 'noreply@broadband.money'
		}

		let fromName = config?.communityName ? `${config?.communityName} Broadband Toolkit` : 'Broadband.money Broadband Toolkit'

		await notion.pages.create({
			parent: {
				database_id: process.env.NOTION_DATABASE_ID
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
						  content: config?.domainName
		  
						}
					  }
					]
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
				fromEmail: {
					rich_text: [
						{
						text: {
							content: fromEmail
						}
						}
					]
				},
				fromName: {
					rich_text: [
						{
						text: {
							content: fromName
						}
						}
					]
				},
			}

		})

      res.status(201).json({ error: null, msg: 'Success send to notion' })
    } catch (error) {
			console.log('error', error)
      res.status(500).json({ error, msg: 'There was an error' })
    }
  
}

module.exports = router