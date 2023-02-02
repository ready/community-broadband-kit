import React from 'react'
import Layout from '/components/common/Layout/Layout'
import Hero from '/components/sections/Hero/Hero'
import RSTTest from '/components/sections/RSTTest/RSTTest'
import InfoSection from '/components/sections/RSTTest/InfoSection'
import RSTTakeTheSurvey from '/components/sections/RSTTest/RSTTakeTheSurvey'
import WhyTakeTest from '/components/sections/WhyTakeTest/WhyTakeTest'
import { useCommunityContext } from '/components/context/CommunityContext'

export default function TermPage({
  config
}) {
  const { startTest, takeSurvey } = useCommunityContext()

  console.log(config)

  return (
    <Layout
      title={'Broadband.Money Community Toolkit: Free Broadband Tests'}
      description={`Gather Broadband.Money's broadband test results to build empirical proof for BEAD's eligibility and challenge process. Find out the unserved and underserved status of broadband serviceable locations in Broadband.Money's area.`}
      ogDescription={`This quick and easy test helps you and your neighbors in Broadband.Money win grants to deliver you better broadband service."`}
      keywords={`Broadband, Internet Speed Test`}
      ogImage='https://storage.googleapis.com/boss-public-assets-prod/measure-broadband.png'
    >
      {<Hero config={config}/>}
      <WhyTakeTest page={'test'}/> 
      <InfoSection section={'tips'}/>
      <InfoSection section={'survey-tips'}/> 
      <InfoSection section={'how-does-it-work'}/>
    </Layout>
  )
}

