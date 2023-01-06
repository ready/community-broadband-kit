const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const historyRouter = require('./routes/historyRouter')
const indexRouter = require('./routes/indexRouter')
const resultsRouter = require('./routes/resultsRouter')
const testRouter = require('./routes/testRouter')
const surveyRouter = require('./routes/surveyRouter')
const addEmailRouter = require('./routes/addEmail')
const emailReminderRouter = require('./routes/emailReminder')
const getResultsFieldsRouter = require('./routes/getResultsFields')
const metadataRouter = require('./routes/metadata')

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
app.use('/', surveyRouter)
app.use('/', addEmailRouter)
app.use('/', emailReminderRouter)
app.use('/', getResultsFieldsRouter)
app.use('/', metadataRouter)

app.get('/reset', function(req, res) {
  res.sendFile(path.join(__dirname, 'static/utils/clearStorage.html'))
})

app.listen(port, async () => {
  console.log(`Community Broadband Toolkit listening on port ${port}`)
})
