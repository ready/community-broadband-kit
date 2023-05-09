const { GRAPHQL_API_URL } = require('./constants')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

async function getConfig(host) {
  let args

  if (host?.endsWith('.broadband.money')) {
    const subdomain = host.slice(0, host.lastIndexOf('.broadband.money'))

    args = `subdomainName: "${subdomain}"`
  } else {
      if (host?.startsWith('www.')) {
          host = host.replace('www.', '')
      }

      args = `domainName: "${host}"`
  }

  const body = JSON.stringify({
    query: `query {
        getCommunityApplicationsByDomain(${args}) {
            organization {
                id
            }
            communityName
            logo
            headerTitle
            headerDescription
            favicon
            buttonText
            heading
            description
            themeColor
            ogTitle
            ogImage
            ogDescription
            logoWidth
            domainName
            isAddressRequired
            showBbmReferences
            individualSurveyEnabled
            showHistory
            resultShareButtons
            showEmailReminder
            welcomeSectionHeading
            welcomeSectionBody
            welcomeSectionImage
        }
    }`
  })

  return fetch(GRAPHQL_API_URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body
  })
  .then(res => res.json())
  .then (result => {
    return result?.data?.getCommunityApplicationsByDomain?.[0]
  })
  .catch(err => console.log(err))
}

module.exports = getConfig