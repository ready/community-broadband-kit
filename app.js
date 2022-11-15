const express = require('express')
const path = require('path')
const { Storage } = require('@google-cloud/storage');
const bodyParser = require('body-parser')
const historyRouter = require('./routes/historyRouter')
const indexRouter = require('./routes/indexRouter')
const resultsRouter = require('./routes/resultsRouter')
const testRouter = require('./routes/testRouter')
const addEmailRouter = require('./routes/addEmail')
const emailReminderRouter = require('./routes/emailReminder')
const getResultsFieldsRouter = require('./routes/getResultsFields')
const metadataRouter = require('./routes/metadata')
const { LOCAL_TESTING_FLAG, CITY_PATH, ISP_PATH } = require('./utils/constants')

const cityFile = 'GeoIP2-City.mmdb'
const ispFile = 'GeoIP2-ISP.mmdb'
const bucketName = 'strengthtest-353601.appspot.com'

const app = express()
const port = 8080

require('dotenv').config()

// Serve the static directory
app.use('/static', express.static(path.join(__dirname, 'static')))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Routes
app.use('/', historyRouter)
app.use('/', indexRouter)
app.use('/', resultsRouter)
app.use('/', testRouter)
app.use('/', addEmailRouter)
app.use('/', emailReminderRouter)
app.use('/', getResultsFieldsRouter)
app.use('/', metadataRouter)

app.get('/reset', function(req, res) {
  res.sendFile(path.join(__dirname, 'static/utils/clearStorage.html'))
})

app.listen(port, async () => {
  try {
    let storage

    if (LOCAL_TESTING_FLAG) {
      const config = {
        credentials: {
          client_email: process.env.GCLOUD_STORAGE_CLIENT_EMAIL,
          private_key: process.env.GCLOUD_STORAGE_PRIVATE_KEY
        }
      }
      
      storage = new Storage(config)

    } else {
      storage = new Storage()
    }

    console.log(CITY_PATH)
    console.log(ISP_PATH)

    // Downloads the file
    await storage.bucket(bucketName).file(cityFile).download({ destination: CITY_PATH })
    await storage.bucket(bucketName).file(ispFile).download({ destination: ISP_PATH })

  } catch (error) {
    if (!LOCAL_TESTING_FLAG) {
      console.log(error)
    }
  }
  
  console.log(`Community Broadband Toolkit listening on port ${port}`)
})
