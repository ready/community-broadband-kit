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
import styles from './Footer.module.css'

const Footer = () => {
  const router = useRouter()
  return (
    <section className={styles.footer}>
      <SectionContent>
        <SectionLeftContent>
          <div className={styles.logo} onClick={()=>router.push('/')}>
            <img src={'/logos/community_logo.svg'} alt='community logo' />
          </div>
          <Title className={styles.title}></Title>
          <Description className={styles.description}></Description>

          {/* <ApplicationForm section='footer-section' /> */}
        </SectionLeftContent>
        <SectionRightContent className={styles.sectionRight}>
          <FooterSegmentLinks />
          <FooterLinks />
        </SectionRightContent>
      </SectionContent>
      <FooterBottom />
    </section>
  )
}

export default Footer
