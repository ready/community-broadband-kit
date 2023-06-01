import React, { useEffect } from 'react'
import Hero from './Hero'
import InfoSection from './InfoSection'
import WhyTakeTest from './WhyTakeTest/WhyTakeTest'
import { useAppContext } from 'components/common/Context/AppContext'
import Layout from 'components/common/Layout/Layout'

const HomePage = () => {
  const {
    config
  } = useAppContext()

  return (
    <Layout>
      {<Hero />}
      <div id='info' />
      {config?.welcomeSectionHeading && <InfoSection section={'welcome'} />}
      <WhyTakeTest page={'test'}/> 
      <InfoSection section={'tips'}/>
      <InfoSection section={'survey-tips'}/> 
      <InfoSection section={'how-does-it-work'}/>
    </Layout>
  )
}

export default HomePage