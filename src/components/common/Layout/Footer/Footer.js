import React from 'react'
import SectionContent from '../../SectionContent/SectionContent'
import SectionLeftContent from '../../SectionContent/SectionLeftContent'
import SectionRightContent from '../../SectionContent/SectionRightContent'
import Title from './Title/Title'
import Description from './Description/Description'
import FooterLinks from './FooterLinks/FooterLinks'
import FooterSegmentLinks from './FooterLinks/FooterSegmentLinks'
import FooterBottom from './FooterBottom/FooterBottom'
import NewsLetter from './NewsLetter/NewsLetter'
import styles from './Footer.module.css'
import { useAppContext } from '../../../common/Context/AppContext'

const Footer = () => {
  const { config } = useAppContext()

  return (
    <section className={styles.footer}>
      <SectionContent>
         <SectionLeftContent className={styles.sectionRight}>
         {config?.showBbmReferences && 
          <>
            <Title className={styles.title}>Stay tuned for updates about our broadband grant journey.</Title>
            <Description className={styles.description}>Want to stay informed about our progress? Enter your email here. We won't share it with third parties.</Description>
            <div className={styles.newsLetter}>
              <NewsLetter header />
            </div> 
           </>}
        </SectionLeftContent>
        <SectionRightContent className={styles.sectionRight}>
          <FooterSegmentLinks />
          <FooterLinks/>
        </SectionRightContent>
      </SectionContent>
      <FooterBottom />
    </section>
  )
}

export default Footer
