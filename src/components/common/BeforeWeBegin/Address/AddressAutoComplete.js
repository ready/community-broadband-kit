import React, { useRef, useEffect, useState } from 'react'
import { Form } from 'antd'
import { useToolkitContext } from 'components/common/Context/ToolkitContext'
import CurrentLocation from './CurrentLocation/CurrentLocation'
import styles from './AddressAutoComplete.module.css'
import { useMapsContext } from 'components/common/Context/MapsProvider'

const AddressAutoComplete = () => {
  const { 
    config,
    metadata,
    setMetadata
  } = useToolkitContext()
  const { googleMaps } = useMapsContext()

  const [form] = Form.useForm()
  const [showCurrentLocation, setShowCurrentLocation] = useState(true)
  const autoCompleteRef = useRef({})
  const inputRef = useRef()

  const handlePlaceSelect = (place) => {
    form.setFieldsValue({address: place?.formatted_address})

    setMetadata({
      ...metadata,
      addressLat: place?.geometry?.location?.lat(),
      addressLon: place?.geometry?.location?.lng(),
      address: place?.formatted_address
    })
  }

  useEffect(() => {
    if (googleMaps) {
      autoCompleteRef.current = new googleMaps.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ['address'],
          componentRestrictions: { country: 'us' }
        }
      )

      autoCompleteRef.current.setFields(['formatted_address', 'geometry'])
      autoCompleteRef.current.addListener('place_changed', async () => {
        const place = await autoCompleteRef.current.getPlace()
        handlePlaceSelect(place)
      }
      )
    } 
  }, [googleMaps])

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
          ref={inputRef}
          placeholder='Enter a location'
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              e.preventDefault()
            }
          }}
        />
      </Form.Item>
      {showCurrentLocation && googleMaps && <CurrentLocation setShowCurrentLocation={setShowCurrentLocation} form={form}/>}
    </Form>
  )
}

export default AddressAutoComplete
