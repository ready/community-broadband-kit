import React from 'react'
import { Button } from 'antd'
import SectionContent from '../common/SectionContent/SectionContent'
import SectionLeftContent from '../common/SectionContent/SectionLeftContent'
import SectionRightContent from '../common/SectionContent/SectionRightContent'
import SectionBlurb from '../common/SectionBlurb/SectionBlurb'
import PrimaryButton from '../common/Button/PrimaryButton'
import LearnMore from './LearnMore/LearnMore'
import LandscapeBackground from './LandscapeBackground/LandscapeBackground'
import { useNavigate } from 'react-router-dom'
import styles from './Hero.module.css'
import { useAppContext } from '../common/Context/AppContext'

const Hero = () => {
  const { config } = useAppContext()
  const title = config?.heading
  const description = config?.description
  
  const navigate = useNavigate()

  const handleStartTest = (e) => {
    navigate('/test')
  }

  const handleTakeSurvey = (e) => {
    navigate('/survey')
  }

  return (
    <section className={styles.hero}>
      <SectionContent hero>
        <SectionLeftContent hero>
          <SectionBlurb title={title} description={description} section='hero' />
          <div className={styles.buttons}>
            <PrimaryButton
              size='big'
              buttonTitle='Take the test'
              onClick={handleStartTest}
            />
             {config?.individualSurveyEnabled && <Button
              size='large'
              className={styles.takeSurvey}
              onClick={handleTakeSurvey}
              >
              Take the survey
            </Button>}
          </div>
          <LearnMore />
        </SectionLeftContent>
        <SectionRightContent className={styles.sectionRight}>
        </SectionRightContent>
        <LandscapeBackground />
      </SectionContent>
    </section>
  )
}

export default Hero
