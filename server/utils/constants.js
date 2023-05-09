const localDevStageProd = require('./localDevStageProd')
const path = require('path')

const HOSTS = {
  default: 'toolkit.broadband.money',
  detroit: 'detroitspeed.broadband.money',
  tribal: 'tribalspeed.broadband.money',
  buchanan: 'buchananspeed.broadband.money',
  worth: 'worthspeed.broadband.money',
  holt: 'holtspeed.broadband.money',
  andrew: 'andrewspeed.broadband.money',
  test: 'testspeed.broadband.money',
  newark: 'checknewarkinternetspeeds.org'
}

const DEFAULT_HOST = HOSTS.newark

const BASE_API_URL = localDevStageProd({
  local: 'http://localhost:4000',
  //local: 'https://boss-api-dev.wl.r.appspot.com',
  dev: 'https://boss-api-dev.wl.r.appspot.com',
  stage: 'https://boss-api-stage.uc.r.appspot.com',
  prod: 'https://boss-api-289815.uc.r.appspot.com'
})

const GRAPHQL_API_URL = `${BASE_API_URL}/graphql`

const CITY_PATH = path.join(__dirname, '../GeoIP2-City.mmdb')
const ISP_PATH = path.join(__dirname, '../GeoIP2-ISP.mmdb')

module.exports = {
  HOSTS,
  DEFAULT_HOST,
  GRAPHQL_API_URL,
  CITY_PATH,
  ISP_PATH
}