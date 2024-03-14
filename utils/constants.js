const path = require('path')
require('dotenv').config()

exports.CITY_PATH = path.join(__dirname, '../GeoIP2-City.mmdb')
exports.ISP_PATH = path.join(__dirname, '../GeoIP2-ISP.mmdb')

const LOCAL_TESTING_FLAG = process.env.NODE_ENV !== 'production'

exports.LOCAL_TESTING_FLAG = LOCAL_TESTING_FLAG

const BGA_URLS = {
    local: 'http://localhost:4000/graphql',
    dev: 'https://dev.api.ready.net/graphql',
    prod: 'https:/api.ready.net/graphql'
}

exports.BGA_URL = LOCAL_TESTING_FLAG ? BGA_URLS.local : BGA_URLS.prod

const domains = {
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

exports.DEFAULT_DOMAIN = LOCAL_TESTING_FLAG ? domains.default : domains.default

export const APOLLO_CLIENT_NAME = 'Community Broadband Kit'