import React from 'react'
import { Button } from 'antd'
import Header from '../../common/Header/Header'
import SectionContent from '../../common/SectionContent/SectionContent'
import SectionLeftContent from '../../common/SectionContent/SectionLeftContent'
import SectionRightContent from '../../common/SectionContent/SectionRightContent'
import SectionBlurb from '../../common/SectionBlurb/SectionBlurb'
import RSTButton from '../../RST/RSTButton'
import LearnMore from '../../common/LearnMore/LearnMore'
import LandscapeBackground from '../../common/LandscapeBackground/LandscapeBackground'
import { useNavigate } from 'react-router-dom'
import styles from './Hero.module.css'
import { useCommunityContext } from '../../context/CommunityContext'

const Hero = () => {
  const { config } = useCommunityContext()
  const title = config?.heading
  const description = config?.description
  
  // const { startTest, setStartTest, takeSurvey, setTakeSurvey, previousResults, setSameSetup } = useCommunityContext()

  const navigate = useNavigate()

  const handleStartTest = (e) => {
    //setStartTest(!startTest)
    //if (previousResults?.connectionType !== 'undefined') setSameSetup(true)
    navigate('/test')
  }

  const handleTakeSurvey = (e) => {
    //setTakeSurvey(!takeSurvey)
    navigate('/survey')
  }

  return (
    <section className={styles.hero}>
      <Header logoColor='white' hero page='broadband-audits' />
      <SectionContent hero>
        <SectionLeftContent hero>
          <SectionBlurb title={title} description={description} section='hero' />
          <div className={styles.buttons}>
            <RSTButton
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
