import React from 'react'
import PrimaryButton from 'components/common/Button/PrimaryButton'
import { useAppContext } from 'components/common/Context/AppContext'
import styles from './CurrentLocation.module.css'

const CurrentLocation = ({ setShowCurrentLocation, form }) => {
  const { strengthTestData, setStrengthTestData, surveyData, setSurveyData } = useAppContext()

  async function getGeolocation() {
    return new Promise((resolve) => {
    function success(position) {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      }
    
      function failure() {
        console.log('hoo')
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
    let latlng = new window.google.maps.LatLng(lat, lng);
    // This is making the Geocode request
    let geocoder = new window.google.maps.Geocoder();
    let address = geocoder.geocode({ 'latLng': latlng },  (results, status) => {
      if (status !== window.google.maps.GeocoderStatus.OK) {
        alert(status);
      }
    });
    return address
  }

  /**
   * Fills in the address entry textbox automatically using geolocation
   */
  async function fillAddressFromGeolocation() {
    setShowCurrentLocation(false)
    form.setFieldsValue({address: 'Loading...'})

    const geolocation = await getGeolocation();

    if (geolocation) {
      let reverseGeocode = await getReverseGeocodingData(geolocation.lat, geolocation.lon)

      const addressLocation = {
        lat: geolocation.lat, 
        lon: geolocation.lon,
        text: reverseGeocode.results[0].formatted_address
      }

      form.setFieldsValue({address: addressLocation.text})

      setStrengthTestData({
        ...strengthTestData,
        addressLat: addressLocation.lat,
        addressLon: addressLocation.lon,
        address: addressLocation.text
      })

      setSurveyData({
        ...surveyData,
        addressLat: addressLocation.lat,
        addressLon: addressLocation.lon,
        address: addressLocation.text
      })

    } else {
      alert("Error occured: Location services have been disabled on this site. Please manually enter in your address or change your browser settings")
    }
  }

  return (
    <PrimaryButton
      buttonTitle='Current location&nbsp;'
      image={<img className={styles.pinIcon} src='/icons/pin.svg' alt='location' />}
      onClick={fillAddressFromGeolocation}
    />
  )
}

export default CurrentLocation
