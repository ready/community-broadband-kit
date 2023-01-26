import sgMail from '@sendgrid/mail'
const fetch = require('node-fetch')
const { Client } = require('@notionhq/client')

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_KEY
})
// this submit data to notion table
export default async function remindEmail(req, res) {
  sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_KEY)
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ message: `${req.method} requests are not allowed` })
  }
  try {
    const {email,domainName,url} = JSON.parse(req.body)

		const domainAssets = await getAssets(domainName)
		let fromEmail 
		if(domainName==='broadbandms.com'){
			fromEmail  = 'noreply@broadbandms.com'
		}else{
			fromEmail = 'noreply@broadband.money'
		}
		let fromName
		if(domainName==='broadbandms.com'){
			fromName = `MS BEAM Office`
		}else{
			if(domainAssets?.communityName){
				fromName = `${domainAssets?.communityName} Broadband Toolkit`
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
						  content: domainName

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

      res.status(201).json({ error: null, msg: 'Success send to notion ' })
    } catch (error) {
      res.status(500).json({ error, msg: 'There was an error' })
    }
}

async function getAssets (domain = 'toolkit.broadband.money') {
	const body = JSON.stringify({
	  query: `query {
			  getCommunityApplicationsByDomain(domainName:"${domain}") {
				  organization {
					  id
				  }
				  communityName
				  logo
				  headerTitle
				  heading
				  description
				  themeColor
				  ogTitle
				  ogImage
				  ogDescription
				  logoWidth
				  domainName
				  organization {
					  id
				  }
			  }
		  }`
	})
  
	return fetch('https:/api.ready.net/graphql', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json'
	  },
	  body
	})
	  .then(res => res.json())
	  .then(result => {
		return result.data.getCommunityApplicationsByDomain[0]
	  })
	  .catch(err => console.log(err))
  }