import React, { useRef, useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { Form } from 'antd'
import { useAppContext } from '../../common/Context/AppContext'
import styles from './AddressAutoComplete.module.css'
import CurrentLocation from './CurrentLocation/CurrentLocation'

const { googleMapLoader } = GoogleMapReact

const AddressAutoComplete = () => {
  const { strengthTestData, setStrengthTestData, surveyData, setSurveyData, config } = useAppContext()
  const [form] = Form.useForm()
  const [showCurrentLocation, setShowCurrentLocation] = useState(true)
  const autoCompleteRef = useRef(null)
  let autoComplete

  const handlePlaceSelect = (e) => {
    const addressObject = autoComplete.getPlace()
    const components = addressObject?.address_components
    const address = {}

    if (components) {
      components.forEach((item, i) => {
        const types = item.types
        const shortName = item.short_name
        const longName = item.long_name
        for (const type of types) {
          switch (type) {
            case 'street_number':
              address.streetNumber = shortName
              break
            case 'route':
              address.route = shortName
              break
            case 'locality':
              address.city = longName
              break
            case ('political'): {
              if (!address.city) {
                address.city = longName
              }
              break
            }
            case ('administrative_area_level_3'): {
              if (!address.city) {
                address.city = longName
              }
              break
            }
            case 'administrative_area_level_1':
              address.state = shortName
              break
            case 'administrative_area_level_2':
              address.county = longName
              break
            case 'country':
              address.country = longName
              break
            case 'postal_code':
              address.zip = shortName
              break
            default:
          }
        }
      })
    }

    address.address1 = `${address.streetNumber || ''} ${address.route || ''}`
    delete address.streetNumber
    delete address.route
    if (!('zip' in address)) {
      address.zip = ' '
    }

    form.setFieldsValue({address: addressObject?.formatted_address})

    const addressLocation = {
      lat: addressObject?.geometry?.location?.lat(), 
      lon: addressObject?.geometry?.location?.lng(),
      text: addressObject?.formatted_address
    }

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
  }
  
  useEffect(() => {
    googleMapLoader({
      key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      libraries: ['places']
    })
    .then((maps) => {
      autoComplete = new maps.places.Autocomplete(
        autoCompleteRef.current,
        { types: ['address'], componentRestrictions: { country: 'us' } }
      )
      autoComplete.setFields(['address_components', 'formatted_address', 'geometry'])
      autoComplete.addListener('place_changed', (i) => {
        const place = autoComplete.getPlace()
        handlePlaceSelect(place)
      })
    })
  // eslint-disable-next-line
  }, [strengthTestData])

  return (
    <Form
      form={form}
      className={styles.address}
    >
      <Form.Item
        name='address'
        validateTrigger='onBlur'
        validateFirst
        rules={[
          { required: config?.isAddressRequired, message: 'This field is required to continue' }
        ]}
        required={config?.isAddressRequired}
      >
        <input
          type='search'
          id='autocomplete'
          className='ant-input ant-input-lg'
          autoComplete='address-line1'
          ref={autoCompleteRef}
          placeholder='Enter a location'
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              e.preventDefault()
            }
          }}
        />
      </Form.Item>
      {showCurrentLocation && <CurrentLocation setShowCurrentLocation={setShowCurrentLocation} form={form}/>}
    </Form>
  )
}

export default AddressAutoComplete
