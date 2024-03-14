const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const {
    BGA_URL,
    DEFAULT_DOMAIN,
    APOLLO_CLIENT_NAME
} = require('./constants')

/**
 * Get a community's assets from the databae using its domain 
 * @param {*} host 
 * @returns An object containing a community's assets
 */
async function getAssets(host = DEFAULT_DOMAIN) {
    let args

    if (host.endsWith('.broadband.money')) {
        const subdomain = host.slice(0, host.lastIndexOf('.broadband.money'))

        args = `subdomainName: "${subdomain}"`
    } else {
        if (host.startsWith('www.')) {
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
            }
        }`
    });

    return fetch(BGA_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apollographql-client-name': APOLLO_CLIENT_NAME
        },
        body
    })
    .then(res => res.json())
    .then (result => {
        return result.data.getCommunityApplicationsByDomain[0]
    })
    .catch(err => console.log(err));
}

module.exports = getAssets
