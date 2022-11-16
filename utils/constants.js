require('dotenv').config()

let LOCAL_TESTING_FLAG = process.env.NODE_ENV !== 'production'
LOCAL_TESTING_FLAG = false

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
    test: 'testspeed.broadband.money'
}

exports.DEFAULT_DOMAIN = LOCAL_TESTING_FLAG ? domains.test : domains.default
