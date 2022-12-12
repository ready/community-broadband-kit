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
	if (req.method !== 'POST') {
		return res
			.status(405)
			.json({ message: `${req.method} requests are not allowed` })
	}
  try {

	const { email,url } = JSON.parse(req.body)
		let fromEmail 
		if(config.domainName==='broadbandms.com'){
			fromEmail  = 'noreply@broadbandms.com'
		}else{
			fromEmail = 'noreply@broadband.money'
		}
		let fromName
		if(config.domainName==='broadbandms.com'){
			fromName = `MS BEAM Office`
		}else{
			if(config.communityName){
				fromName = `${config.communityName} Broadband Toolkit`
			}else{
				fromName =  'Broadband.money Broadband Toolkit'
			}
		}
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

      res.status(201).json({ error: null, msg: 'Success send to notion ' })
    } catch (error) {
      res.status(500).json({ error, msg: 'There was an error' })
    }
  
}

module.exports = router;