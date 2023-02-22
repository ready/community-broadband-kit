import React, { useEffect } from 'react'
import Layout from '/components/common/Layout/Layout'
import Hero from '/components/sections/Hero/Hero'
import InfoSection from '/components/sections/RSTTest/InfoSection'
import WhyTakeTest from '/components/sections/WhyTakeTest/WhyTakeTest'
import { useEnableScroll } from '/components/context/ScrollContext'
import { useRouter } from 'next/router'

export default function TermPage({
  config
}) {
  const [scroll, setScroll] = useEnableScroll()
  const router = useRouter()
  const pathname = router.asPath

  useEffect(() => {
    if (pathname === '/#info') {
      setScroll(true)
      console.log('yii')
    }
  }, [pathname])

  return (
    <Layout
      title={'Broadband.Money Community Toolkit: Free Broadband Tests'}
      description={`Gather Broadband.Money's broadband test results to build empirical proof for BEAD's eligibility and challenge process. Find out the unserved and underserved status of broadband serviceable locations in Broadband.Money's area.`}
      ogDescription={`This quick and easy test helps you and your neighbors in Broadband.Money win grants to deliver you better broadband service."`}
      keywords={`Broadband, Internet Speed Test`}
      ogImage='https://storage.googleapis.com/boss-public-assets-prod/measure-broadband.png'
      config={config}
    >
      {<Hero config={config}/>}
      {config?.welcomeSectionHeading && <InfoSection section={'welcome'} config={config}/>}
      <WhyTakeTest page={'test'}/> 
      <InfoSection section={'tips'}/>
      <InfoSection section={'survey-tips'}/> 
      <InfoSection section={'how-does-it-work'}/>
    </Layout>
  )
}

