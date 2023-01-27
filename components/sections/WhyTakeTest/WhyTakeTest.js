import React from 'react'

import ReportContain from '../../common/ReportContain/ReportContain'
import Header from '../../common/Header/Header'

import styles from './WhyTakeTest.module.css'

const WhyTakeTest = ({ page, stateSpecificData }) => {
  const stateInfo = stateSpecificData?.state
  const getReportSteps = (page) => {
    switch (page) {
      case 'rec':
        return {
          iconSrc: '/icons/checked.svg',
          details:
            [
              {
                verb: '5 REASONS WHY RECS WIN',
                blurb: 'RECs are eligible for IIJA BEAD. Learn why RECs that apply will be well-positioned to win. Decide if you should apply.'
              },
              {
                verb: 'HOW IIJA DIFFERS FROM RDOF',
                blurb: 'Auctions? Consortiums? What worked for RECs in RDOF won’t work for RECs in the upcoming IIJA BEAD. Get the facts.'
              },
              {
                verb: '6 KEYS FOR REC APPLICANTS',
                blurb: 'Find partners. Research grants and sociodemographics inside and near your coop boundaries. Understand ongoing reporting requirements, and more. Plan to win.'
              },
              {
                verb: 'UNIQUE INSIGHTS FOR RECS',
                blurb: 'Even RECS that don’t want to be an ISP can win their share of broadband funding in IIJA BEAD. Modern tools take the hassle out of ongoing grant reporting. Learn how.'
              }
            ],
          backgroundColor: 'var(--color-blue-6)',
          title:'Free report contains:'
        }
      case 'survey':
        return {
          iconSrc: '/icons/checked.svg',
          details:
            [
              {
                verb: `It helps all residents`,
                blurb: `Taking this test helps residents gather the empirical proof it needs to demonstrate unserved and underserved areas within it.`
              },
              {
                verb: "It's Free",
                blurb: 'This test is 100% free and crucial in helping us build our case for federal broadband grant funding.'
              },
              {
                verb: "It's built for privacy",
                blurb: 'Apart from survey questions voluntarily taken by you, this test does not gather or disclose any information about you.'
              },
              {
                verb: 'It takes 2 minutes',
                blurb: "It's fast! Two minutes out of your day can strengthen our case and help us identify places in need of improvement."
              }
            ],
          backgroundColor: 'var(--color-blue-9)',
          title:'Why should you take the test?'
        }
      case 'tribal':
        return {
          iconSrc: '/icons/report-arrow.svg',
          details:
            [
              {
                verb: 'What will the acp benefit mean to your family',
                blurb: 'A component of the Infrastructure Investment  And Jobs Act (IIJA), this program provides $75/month for households on Tribal Lands.'
              },
              {
                verb: 'Determining if you hav an Internet Service Provider',
                blurb: ' "ISP" stands for Internet Service Provider.  Your community may or may not have an ISP currently providing internet to your household and/or administrative buildings.'
              },
              {
                verb: 'how to apply for the acp benefit',
                blurb: 'Communication is key and there is help available.  First, inquire from your ISP about applying to the ACP program.'
              },
              {
                verb: 'THE BENEFIT IS STILL AVAILABLE FOR TRIBAL COMMUNITIES',
                blurb: "Money is earmarked for you! - The money is available and it's simply a matter of raising your hand.  We can help!"
              }
            ],
          backgroundColor: 'var(--tribal-blue)',
          title:'Free report contains:'
        }
      default:
    }
  }
  const steps = getReportSteps(page)

  return (
    <section className={styles.reportSection} style={{ backgroundColor: steps?.backgroundColor }}>
      <Header title={steps.title} page={page} logoColor='white' stateSpecificData={stateSpecificData} />
      <div className={styles.reportContains}>
        {steps.details?.map(step => (
          <ReportContain key={step.verb} {...step} iconSrc={steps.iconSrc} page={page} />
        ))}
      </div>
    </section>
  )
}

export default WhyTakeTest
