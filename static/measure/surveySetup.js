import { LOCAL_TESTING_FLAG } from '/static/utils/constants.js'
import { initSurvey } from '/static/measure/survey.js'
import { uploadNoServiceData} from "/static/measure/handleResults.js"
import { getUuid } from '/static/utils/cookies.js'

// Document selectors
const addressRequired = document.getElementById('address').getAttribute('address-required')
const addressElement = document.getElementById('address')
const geolocationElement = document.getElementById('geolocation')
const addressWarningElement = document.getElementById('address-warning')
const noServiceElement = document.getElementById('servicable-location')
const submitAddressBtn = document.getElementById('submit-address')
const beginSurveyBtn = document.getElementById('start-survey-btn')

// Declare variables
let autocomplete
let metadata = getMetadata()
let address = {
  text: '',
  lat: null,
  lon: null
}
let noService
let phoneNumber

const userId = getUuid()

/**
 * Gets the user's geolocation in the browser
 * @returns latititde and longitude coordinates of the user's current location
 */
async function getGeolocation() {
  return new Promise((resolve) => {
  function success(position) {
      resolve({
        lat: position.coords.latitude,
        long: position.coords.longitude
      });
    }
  
    function failure() {
      resolve(null);
    }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(success, failure);
    } else {
      failure();
    }
  })
}

/**
 * Reverse geocodes lat and long data to get the address associated with the coordinate
 * @param {*} lat 
 * @param {*} lng 
 * @returns An address
 */
async function getReverseGeocodingData(lat, lng) {
  let latlng = new google.maps.LatLng(lat, lng);
  // This is making the Geocode request
  let geocoder = new google.maps.Geocoder();
  let address = geocoder.geocode({ 'latLng': latlng },  (results, status) => {
    if (status !== google.maps.GeocoderStatus.OK) {
      alert(status);
    }
    // This is checking to see if the Geoeode Status is OK before proceeding
    if (status == google.maps.GeocoderStatus.OK) {
      // console.log(results[0].formatted_address);
    }
  });
  return address
}

/**
 * Fills in the address entry textbox automatically using geolocation
 */
async function fillAddressFromGeolocation() {
  addressWarningElement.style.display = 'none'
  document.getElementById('autocomplete').value = "Loading..."
  geolocationElement.style.display = 'none'
  const geolocation = await getGeolocation();

  if (geolocation) {
    address.lat = geolocation.lat
    address.lon = geolocation.long
    let reverseGeocode = await getReverseGeocodingData(address.lat, address.lon)
    address.text = reverseGeocode.results[0].formatted_address
    document.getElementById('autocomplete').value = address.text

  } else {
    alert("Error occured: Location services have been disabled on this site. Please manually enter in your address or change your browser settings")
    document.getElementById('autocomplete').value = ''
    document.getElementById('autocomplete').placeholder = 'Enter a location'
  }
}

/**
 * Displays the correct address prompt depending on if address 
 * is required to take the test
 */
function displayAddressPrompt() {
  // Save phone number
  phoneNumber = document.getElementById('phone').value

  // Display warning if no phone number entered
  if(!phoneNumber) {
    document.getElementById('phone-warning').style.display = 'flex'
  } else {
    // If address entry is optional state address is not required
    if (!addressRequired) {
        document.getElementById("address-entry-message").textContent = "Your location is used to help your community get better internet. Entering your location is optional. It will not be shared with the public."
      }
    
      document.getElementById('survey-instruction').style.display = 'none'
      addressElement.style.display = 'flex'
    
      autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        {
          types: ['address'],
          fields: ['geometry', 'formatted_address']
        }
      );
    
      autocomplete.addListener('place_changed', onPlaceChanged);
  }
}

/**
 * Google maps autocomplete function
 */
function onPlaceChanged() {
  addressWarningElement.style.display = 'none'
  let place = autocomplete.getPlace()

  if (!place.geometry) {
    // User did not select a prediction; reset the input field
    document.getElementById('autocomplete').placeholder = 'Enter a location'
  } else {
    address.text = place.formatted_address
    address.lat = place.geometry.location.lat()
    address.lon = place.geometry.location.lng()
  }
}

/**
 * Validates the address entered. Either displays a warning or displays checklist.
 * If no service at the location, displays no service message instead of checklist
 */
async function validateAddress() {
  noService = noServiceElement.checked

  if (!LOCAL_TESTING_FLAG && (document.getElementById('autocomplete').value === '' || !address.lat || !address.lon) && addressRequired && !noService) {
    addressWarningElement.style.display = 'block'
  } else {
    addressElement.style.display = "none"

    // If no service at the location, record response and display message rather than starting test
    if (noService) {
      let uuid = getUuid()
      let results = {
        uuid: uuid,
        organizationId: organizationId,
        addressLat: address.lat || 37.5630,
        addressLon: address.lon || 122.3255,
        lat: metadata.lat || 37.5630,
        lon: metadata.lon || 122.3255,
        address: address.text,
        noService: noService
      }

      // Upload no service results
      await uploadNoServiceData(results)

      // Hide address display
      addressElement.style.display = 'none'

      // Display recorded response message
      document.getElementById('no-service').style.display = 'flex'
    }
    else {
      // Display survey
      displaySurvey()
    }
  }
}

/**
 * Fetches metadata associated with the test taker
 * @returns An object containing metadata 
 */
async function getMetadata() {
  return fetch('/metadata')
    .then(res => res.json())
    .then(incoming => {
      return {
      ip: incoming.ip,
      isp: incoming.isp ? incoming.isp.isp : null,
      asn: incoming.isp ? incoming.isp.asn : null,
      browserName: incoming.ua.browser.name,
      browserVersion: incoming.ua.browser.version,
      deviceType: incoming.ua.device.type,
      deviceVendor: incoming.ua.device.vendor,
      deviceModel: incoming.ua.device.model,
      engineName: incoming.ua.engine.name,
      engineVersion: incoming.ua.engine.version,
      osName: incoming.ua.os.name,
      osVersion: incoming.ua.os.version,
      cpu: incoming.ua.cpu.architecture,
      lat: incoming.loc ? incoming.loc.lat : null,
      lon: incoming.loc ? incoming.loc.lon : null
      }
  }).catch(err => console.log(err));
}

/**
 * Function to display only the survey flow (without speed test)
 */
 async function displaySurvey(){
  document.getElementById('survey-instruction').style.display = 'none'
  metadata = await metadata
  initSurvey(metadata.ip, address.lat, address.lon, address.text, phoneNumber, "stand-alone")
}

beginSurveyBtn.addEventListener('click', displayAddressPrompt)
submitAddressBtn.addEventListener('click', validateAddress)
geolocationElement.addEventListener("click", fillAddressFromGeolocation)