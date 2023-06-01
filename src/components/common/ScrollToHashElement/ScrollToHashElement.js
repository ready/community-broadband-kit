import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const ScrollToHashElement = () => {
  let location = useLocation()
  let navigate = useNavigate()
  const [hashElement, setHashElement] = useState(null)

  useEffect(() => {
    let hash = location.hash
    const removeHashCharacter = (str) => {
      const result = str.slice(1)
      return result
    }

    const onPageLoad = () => {
      if (hash) {
        let element = document.getElementById(removeHashCharacter(hash))
        setHashElement(element)
      } else {
        setHashElement(null)
      }
    }

    // Check if the page has already loaded
    if (document.readyState === 'complete') {
      onPageLoad()
    } else {
      window.addEventListener('load', onPageLoad)
      // Remove the event listener when component unmounts
      return () => window.removeEventListener('load', onPageLoad)
    }
  }, [location])

  useEffect(() => {
    if (hashElement) {
      hashElement.scrollIntoView({
        behavior: "smooth",
        inline: "nearest",
      })

      navigate(location.pathname)
    }
  }, [hashElement])

  return null
}

export default ScrollToHashElement