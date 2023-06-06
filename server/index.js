require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require("fs"); 
const app = express();
const getConfig = require('./utils/getConfig')
const { DEFAULT_HOST } = require('./utils/constants')
const metadataRouter = require('./routes/metadata')

const PORT = process.env.PORT || 3001;
const indexPath  = path.resolve(__dirname, '..', 'build', 'index.html');

app.use('/', metadataRouter)

app.get('/', returnIndexPage)

app.use(express.static(path.join(__dirname, '..', 'build')))
app.use(returnIndexPage)

app.listen(PORT, (error) => {
  if (error) {
      return console.log('Error during app startup', error)
  }
  console.log("listening on " + PORT + "...")
})

function returnIndexPage(req, res, next) {
  fs.readFile(indexPath, 'utf8', async (err, htmlData) => {
    if (err) {
        console.error('Error during file reading', err);
        return res.status(404).end()
    }
    
    let host = req?.headers?.host
    let config = await getConfig(host)

    if (!config) {
      config = await getConfig(DEFAULT_HOST)
    }

    if (!config) return res.status(404).send("Page not found")

    const colors = config?.themeColor.map(color => `#${color}`)

    htmlData = htmlData
    .replace('__FAVICON__', config.favicon || 'favicon.ico')
    .replace('<title>Community Broadband Kit</title>',
    config.headerTitle ?
    `<title>${config.headerTitle}</title>` :
    `<title>${config.communityName} Community Toolkit: Free Broadband Tests</title>`)
    .replace('__META_DESCRIPTION__', config.headerDescription || `Gather ${config.communityName}'s broadband test results to build empirical proof for BEAD's eligibility and challenge process. Find out the unserved and underserved status of broadband serviceable locations in ${config.communityName}'s area.`)
    .replace('__META_KEYWORDS__', `free, broadband test, empirical data, performance test, eligibility, challenge process, unserved, served, underserved, broadband, state broadband office list, iija, ntia, ntia/iija, treasury cpf, cpf, award grants, win broadband grants, community, community toolkit, BEAD, NOFO, broadband grants, communities, guides, subsidiarities, census block groups, ${config.communityName}`)
    .replace('__META_OG_TITLE__', config.ogTitle || config.headerTitle || `Be a champion of your community. Help ${config.communityName} by taking a free internet speed test.`)
    .replace('__META_OG_DESCRIPTION__', config.ogDescription || config.headerDescription || `This quick and easy test helps you and your neighbors in ${config.communityName} win grants to deliver you better broadband service.`)
    .replace('__META_OG_IMAGE__', config.ogImage || 'https://storage.googleapis.com/boss-public-assets-prod/measure-broadband.png')
    .replace('__META_TWITTER_TITLE__', config.ogTitle || config.headerTitle || `Be a champion of your community. Help ${config.communityName} by taking a free internet speed test.`)
    .replace('__META_TWITTER_DESCRIPTION__', config.ogDescription || config.headerDescription || `This quick and easy test helps you and your neighbors in ${config.communityName} win grants to deliver you better broadband service.`)
    .replace('__META_TWITTER_IMAGE__', config.ogImage || 'https://storage.googleapis.com/boss-public-assets-prod/measure-broadband.png')
    .replace('<style></style>', `
      <style>
        :root {
          --color-heading: ${colors?.[1]};
          --color-subheading: ${colors?.[2]};
          --color-text: ${colors?.[3]};
          --color-button: ${colors?.[4]};
          --color-button-hover: ${colors?.[5]};
          --color-background1: ${colors?.[6]};
          --color-background2: ${colors?.[7]};
          --color-background3: ${colors?.[8]};
          --color-footer: ${colors?.[9]};
          --color-nav-text: ${colors?.[10]};
          --color-accent: ${colors?.[11]};
          --color-light-accent: ${colors?.[12]};
        }
      </style>
    `)
    .replace('window.CONFIG={}', `window.CONFIG = ${JSON.stringify(config)}`)
    
    return res.send(htmlData)
  })
}