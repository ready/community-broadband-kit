import React from 'react'

const ScrollContext = React.createContext()

const useEnableScroll = () => {
  const context = React.useContext(ScrollContext)
  if (context === undefined) {
    throw new Error('ScrollContext must be used within a ScrollContext Provider')
  }
  return context
}

const ScrollContextProvider = ({ children }) => {
  const [scroll, setScroll] = React.useState(false)

  React.useEffect(() => {
    if (scroll) {
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
      })

      setScroll(false)
    }
  }, [scroll])

  return (
    <ScrollContext.Provider value={[scroll, setScroll]}>
      {children}
    </ScrollContext.Provider>
  )
}

export { useEnableScroll, ScrollContextProvider }
