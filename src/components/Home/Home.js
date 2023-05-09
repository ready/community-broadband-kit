import React, { useEffect } from 'react'
import Hero from '../sections/Hero/Hero'
import InfoSection from '../sections/RSTTest/InfoSection'
import WhyTakeTest from '../sections/WhyTakeTest/WhyTakeTest'
import { useEnableScroll } from '../context/ScrollContext'
import { useLocation } from 'react-router-dom'
import { useCommunityContext } from '../context/CommunityContext'

const Home = () => {
  const [setScroll] = useEnableScroll()
  const {
    config
  } = useCommunityContext()
  const location = useLocation()
  const pathname = location?.pathname

  useEffect(() => {
    if (pathname === '/#info') {
      setScroll(true)
    }
  }, [pathname, setScroll])

  return (
    <>
      {<Hero />}
      {config?.welcomeSectionHeading && <InfoSection section={'welcome'} />}
      <WhyTakeTest page={'test'}/> 
      <InfoSection section={'tips'}/>
      <InfoSection section={'survey-tips'}/> 
      <InfoSection section={'how-does-it-work'}/>
    </>
  )
}

export default Home