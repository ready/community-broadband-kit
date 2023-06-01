import React, { useEffect, useState } from 'react'

const MapsContext = React.createContext()

export const useMapsContext = () => {
  const context = React.useContext(MapsContext)
  if (context === undefined) {
    throw new Error('MapsContext must be used within the MapsProvider')
  }
  return context
}

const MapsProvider = props => {
  const [googleMaps, setGoogleMaps] = useState(undefined)

  const value = {
    googleMaps
  }

  const getGoogleMapsAPI = () => {
    const googleMapsPromise = new Promise((resolve) => {
      window.resolveGoogleMapsPromise = () => {
        resolve(window.google)
        delete window.resolveGoogleMapsPromise
      }

      const script = document.createElement('script')
      script.src = `//maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&callback=resolveGoogleMapsPromise`
      script.async = true
      document.body.appendChild(script)
    })

    return googleMapsPromise
  }

  useEffect(() => {
    const initGoogleMapsApi = async () => {
      const google = await getGoogleMapsAPI()
      setGoogleMaps(google)
    }

    initGoogleMapsApi()
  }, [])

  return (
    <MapsContext.Provider value={value}>
      {props.children}
    </MapsContext.Provider>
  )
}

export default MapsProvider