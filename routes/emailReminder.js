const express = require('express');
const router = express.Router();
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
	if (req.method !== 'POST') {
			return res
				.status(405)
				.json({ message: `${req.method} requests are not allowed` })
	}
  try {
    const email = req.body.email
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

      res.status(201).json({ error: null, msg: 'Success send to notion ' })
    } catch (error) {
      res.status(500).json({ error, msg: 'There was an error' })
    }
  
}

module.exports = router;