import React from 'react'
import SectionContent from 'components/common/SectionContent/SectionContent'
import SectionLeftContent from 'components/common/SectionContent/SectionLeftContent'
import SectionRightContent from 'components/common/SectionContent/SectionRightContent'
import Title from './Title/Title'
import FooterLinks from './FooterLinks/FooterLinks'
import FooterSegmentLinks from './FooterLinks/FooterSegmentLinks'
import FooterBottom from './FooterBottom/FooterBottom'
import styles from './Footer.module.css'
import { useAppContext } from 'components/common/Context/AppContext'

const Footer = () => {
  const { config } = useAppContext()

  return (
    <section className={styles.footer}>
      <SectionContent>
         <SectionLeftContent className={styles.sectionRight}>
         {config?.showBbmReferences && 
          <>
            <Title className={styles.title}>Stay tuned for updates about our broadband grant journey.</Title>
            <a className={styles.newsletter} href='https://www.broadband.io/' target='_blank' rel='noreferrer'>Join the broadband community.</a>
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
