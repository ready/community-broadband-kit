import { MAP_STATES } from './constants'

/**
 * Function that takes in address components and returns the full address
 * as a string
 * @param {String} addr1
 * @param {String} addr2 - typically the building number
 * @param {String} city
 * @param {String} zip
 * @param {String} stateAbbr - state abbreviation (either 'mo' or 'MO' is acceped)
 * @returns {String}
 */

const maskStreetAddress = (streetAddress) => {
  return streetAddress.split(' ').map((str) => {
    str = str[0] + str.slice(1).replace(/.(?!$)/g, '*')
    return str.replace(/[0-9]/g, '*')
  })?.join(' ')
}

const capitalizeFirstLetter = (str) => {
  return str.split(' ')?.map((word) => {
    const lowerCaseWord = word?.toLowerCase()
    return lowerCaseWord[0]?.toUpperCase() + lowerCaseWord?.substring(1)
  })?.join(' ')
}

export const formatAddress = ({
  addr1 = '',
  addr2 = '',
  city = '',
  zip = '',
  stateAbbr = '',
  maskAddress = false,
  multiLine = false
}) => {
  const stateObj = MAP_STATES[stateAbbr?.toUpperCase()]
  const state = stateObj?.name || ''
  if (maskAddress) {
    addr1 = maskStreetAddress(addr1)
  }
  const streetArr = [addr1, addr2]
  const cityArr = [city, state, zip]
  const firstAddress = capitalizeFirstLetter(streetArr.filter(i => i !== '').join(', '))
  const secondAddress = capitalizeFirstLetter(cityArr.filter(i => i !== '').join(', '))
  return multiLine ? `${firstAddress}\n${secondAddress}` : `${firstAddress}, ${secondAddress}`
}
