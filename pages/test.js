import React, { useState } from 'react'
import RSTTest from '../components/sections/RSTTest/RSTTest'
import Layout from '../components/common/Layout/Layout'
import { useCommunityContext } from '../components/context/CommunityContext'

const Test = () => {
  return (
    <Layout
      title={'Broadband.Money Community Toolkit: Free Broadband Tests'}
      description={`Gather Broadband.Money's broadband test results to build empirical proof for BEAD's eligibility and challenge process. Find out the unserved and underserved status of broadband serviceable locations in Broadband.Money's area.`}
      ogDescription={`This quick and easy test helps you and your neighbors in Broadband.Money win grants to deliver you better broadband service."`}
      keywords={`Broadband, Internet Speed Test`}
      ogImage='https://storage.googleapis.com/boss-public-assets-prod/measure-broadband.png'
    >
      <RSTTest></RSTTest>
    </Layout>
  )
}

export default Test
