import { initSurvey } from '/static/measure/survey.js'

import runTests from '/static/test/runTests.js'
import handleResults from "/static/measure/handleResults.js"
import config from '/static/measure/config.js'
import { LOCAL_TESTING_FLAG} from '/static/utils/constants.js'

// Document selectors
const addressRequired = document.getElementById('address').getAttribute('address-required')
const checklistElement = document.getElementById('checklist')
const addressElement = document.getElementById('address')
const headerShareBtns = document.getElementById('header-share-buttons')
const geolocationElement = document.getElementById('geolocation')
const addressWarningElement = document.getElementById('address-warning')
const nextBtn = document.getElementById('next-btn')
const beginTestBtn = document.getElementById('begin-test')
const ispNameElement = document.getElementById('isp-name')
const testElement = document.getElementById('test')
const mlabLoadBar = document.getElementById('mlab-load-bar')
const testSourceElement = document.getElementById('test-source')
const testTypeElement = document.getElementById('test-type')

// Declare variables
let autocomplete
let metadata = getMetadata()
let checklistResponses ={}
let address = {
  text: '',
  lat: null,
  lon: null
}
const checklistItemTotal = 4
let checklistCounter = 1

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
 * Displayes the next checklist item until all steps have been taken
 * and updates the progress bar
 */
function displayNextChecklistItem() {
  // Add previously answered checklist item's response to the checklist response object
  getChecklistItemResponse()  

  // Replace progress bar number with svg checkmark
  const step = document.getElementById("step-" + checklistCounter)
  step.textContent = ''
  step.innerHTML += '<svg id="checkmark" focusable="false" aria-hidden="true" width="50%" viewBox="0 0 24 24"><path stroke="var(--color-accent)" d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>'
  // If on step 1, remove original color class from html 
  if (checklistCounter == 1) {
  step.classList.remove('checklist-colored-circle')
  }
  // Update progress bar colors for the previous step
  step.classList.add("checklist-uncolored-circle")

  // Hide answered checklist item and display next
  const currentQuestion = 'item-' + checklistCounter
  document.getElementById(currentQuestion).style.display = 'none'
  checklistCounter++
  const nextQuestion = 'item-' + checklistCounter
  document.getElementById(nextQuestion).style.display = 'block'

  // Update progress bar color of next step
  const nextStep = document.getElementById("step-" + checklistCounter)
  nextStep.classList.add("checklist-colored-circle")
}

function skipOrDisplayAddress() {
  // If more checklist items exist, display next item
  if (checklistCounter < checklistItemTotal) {
    displayNextChecklistItem()
  }
  // Otherwise dislpay or skip address 
  else {
    // If address coords for user already exist in session storage, 
    // skip address prompt, save coords to upload to multitest data/survey, and begin test
    address.lat = sessionStorage.getItem('addressLat')
    address.lon = sessionStorage.getItem('addressLon')
    address.text = sessionStorage.getItem('addressText')
    if (address.lat && address.lon && address.text) {
      beginTest()
    } else {
      displayAddressPrompt()
    }
  }
}

/**
 * Displays the correct address prompt depending on if address 
 * is required to take the test
 */
function displayAddressPrompt() {
  // If address entry is optional state address is not required
  if (!addressRequired) {
    document.getElementById("address-entry-message").textContent = "Your location is used to help your community get better internet. Entering your location is optional. It will not be shared with the public."
  }

  checklistElement.style.display = 'none'
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
 * Validates the address entered. Either displays a warning or begins the test
 */
function validateAddress() {
  if (!LOCAL_TESTING_FLAG && (document.getElementById('autocomplete').value === '' || !address.lat || !address.lon) && addressRequired) {
    addressWarningElement.style.display = 'block'
  } else {
    beginTest()
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
 * Gets the user's responses to items in the pre-test checklist
 * and adds them to an object
 */
function getChecklistItemResponse() {
  const picked = document.querySelectorAll('.selected-answer');

  if (checklistCounter === 1) {
    if (picked.length > 0) {
      picked.forEach(pick => {
        if (pick.id === 'using-ethernet') {
          checklistResponses.usingEthernet = true
        } else {
          checklistResponses.usingEthernet = false
        }
    
        if (pick.id === 'wifi') {
          if (document.getElementById("close-to-router").checked) {
            checklistResponses.closeToRouter = true
          } else {
            checklistResponses.closeToRouter = false
          }
        } else {
          checklistResponses.closeToRouter = false
        }
  
      });
    } else {
      checklistResponses.usingEthernet = false
      checklistResponses.closeToRouter = false
    }  
  }
  
  if (checklistCounter === 2) {
    if (picked.length > 0) {
      picked.forEach(pick => {
        if (pick.id === 'vpn-off') {
          checklistResponses.vpnOff = true
        } else {
          checklistResponses.vpnOff = false
        }
      });
    } else {
      checklistResponses.vpnOff = false
    }  
  }

  if (checklistCounter === 3) {
    if (picked.length > 0) {
      picked.forEach(pick => {
        if (pick.id === 'no-interruption') {
          checklistResponses.noInterruptFromOtherDevices = true
        } else {
          checklistResponses.noInterruptFromOtherDevices = false
        }
      });
    } else {
      checklistResponses.noInterruptFromOtherDevices = false
    }  
  }
}

/**
 * Sets up and runs the speed tests
 */
async function beginTest() {
  // Display the error page if the client is not online
  if (!navigator.onLine) {
    config.error?.('Error: client is offline');
  }

  window.onoffline = () => {
    config.error?.('Error: client is offline');
  }

  // Stores the address data in session storage
  sessionStorage.setItem('addressLat', address.lat)
  sessionStorage.setItem('addressLon', address.lon)
  sessionStorage.setItem('addressText', address.text)

  // Hides pre-test elements
  headerShareBtns.style.display = 'none'
  checklistElement.style.display = 'none'
  addressElement.style.display = 'none'

  // Gets metadata
  metadata = await metadata

  // Sets up the survey
  initSurvey(metadata.ip)

  // Set up test display
  ispNameElement.textContent = metadata.isp
  testElement.style.display = 'flex'
  testTypeElement.style.visibility = 'visible'
  testSourceElement.textContent = 'Running M-Lab Speed Test...'
  testTypeElement.textContent = 'Downloading'
  mlabLoadBar.classList.replace('load-bar-not-started', 'load-bar-started')

  try {
    // Run the speedtests
    const results = await runTests(config)

    // Upload and display results
    handleResults(metadata, checklistResponses, address, results)

    // Remove the offline error page handler
    window.onoffline = () => {}
  } catch (error) {
    // Remove the offline error page handler
    window.onoffline = () => {}

    return
  }
}

// Event listeners
geolocationElement.addEventListener("click", fillAddressFromGeolocation)
nextBtn.addEventListener("click", skipOrDisplayAddress)
beginTestBtn.addEventListener('click', validateAddress)