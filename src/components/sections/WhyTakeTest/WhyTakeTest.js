import React from 'react'

import ReportContain from '../../common/ReportContain/ReportContain'
import Header from '../../common/Header/Header'

import styles from './WhyTakeTest.module.css'

const WhyTakeTest = ({ page }) => {
  const getReportSteps = (page) => {
    switch (page) {
      case 'test':
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
          backgroundColor: 'var(--color-background2)',
          title:'Why should you take the test?'
        }
      default:
    }
  }
  const steps = getReportSteps(page)

  return (
    <section className={styles.reportSection} style={{ backgroundColor: steps?.backgroundColor }}>
      <Header title={steps.title} page={page} logoColor='white' />
      <div className={styles.reportContains}>
        {steps.details?.map(step => (
          <ReportContain key={step.verb} {...step} iconSrc={steps.iconSrc} page={page} />
        ))}
      </div>
    </section>
  )
}

export default WhyTakeTest
