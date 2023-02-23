import React from 'react'
import { useRouter } from 'next/router'
import SectionContent from '../../common/SectionContent/SectionContent'
import SectionLeftContent from '../../common/SectionContent/SectionLeftContent'
import SectionRightContent from '../../common/SectionContent/SectionRightContent'
import Title from '../../common/Title/Title'
import Description from '../../common/Description/Description'
import FooterLinks from '../../common/FooterLinks/FooterLinks'
import FooterSegmentLinks from '../../common/FooterLinks/FooterSegmentLinks'
import FooterBottom from '../../common/FooterBottom/FooterBottom'
import NewsLetter from '../../common//NewsLetter/NewsLetter'
import styles from './Footer.module.css'

const Footer = ({ config }) => {
  const router = useRouter()
  return (
    <section className={styles.footer}>
      <SectionContent>
         <SectionLeftContent>
         {config.showBbmReferences && 
          <>
            <Title className={styles.title}>Stay tuned for updates about our broadband grant journey.</Title>
            <Description className={styles.description}>Want to stay informed about our progress? Enter your email here. We won't share it with third parties.</Description>
            <div className={styles.newsLetter}>
              <NewsLetter header />
            </div> 
           </>}
        </SectionLeftContent>
        <SectionRightContent className={styles.sectionRight}>
          <FooterSegmentLinks config={config}/>
          <FooterLinks/>
        </SectionRightContent>
      </SectionContent>
      <FooterBottom config={config} />
    </section>
  )
}

export default Footer