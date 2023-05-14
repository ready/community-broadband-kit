import React, { useEffect } from 'react'
import Hero from './Hero'
import InfoSection from './InfoSection'
import WhyTakeTest from './WhyTakeTest/WhyTakeTest'
import { useEnableScroll } from '../common/Context/ScrollContext'
import { useLocation } from 'react-router-dom'
import { useAppContext } from '../common/Context/AppContext'
import Layout from '../common/Layout/Layout'

const Home = () => {
  const location = useLocation()
  const pathname = location?.pathname
  const [setScroll] = useEnableScroll()
  
  const {
    config
  } = useAppContext()

  useEffect(() => {
    if (pathname === '/#info') {
      setScroll(true)
    }
  }, [pathname, setScroll])

  return (
    <Layout>
      {<Hero />}
      {config?.welcomeSectionHeading && <InfoSection section={'welcome'} />}
      <WhyTakeTest page={'test'}/> 
      <InfoSection section={'tips'}/>
      <InfoSection section={'survey-tips'}/> 
      <InfoSection section={'how-does-it-work'}/>
    </Layout>
  )
}

export default Home