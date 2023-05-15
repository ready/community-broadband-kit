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

app.get('*', (req, res, next) => {
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

    htmlData = htmlData.replace(
        '<title>Community Broadband Toolkit</title>',
        `<title>${config.title}</title>`
    )
    .replace('__META_OG_TITLE__', config.headerTitle)
    .replace('__META_OG_DESCRIPTION__', config.ogDescription || config.headerDescription)
    .replace('__META_DESCRIPTION__', config.headerDescription)
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
})

app.use(express.static(path.join(__dirname, '..', 'build')))
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
})

app.listen(PORT, (error) => {
  if (error) {
      return console.log('Error during app startup', error)
  }
  console.log("listening on " + PORT + "...")
})