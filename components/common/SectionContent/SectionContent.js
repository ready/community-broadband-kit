import styles from './SectionContent.module.css'

const SectionContent = ({ children, hero, RECHero }) => {
  return (
    <div className={`${styles.section} ${hero ? styles.heroSection : ''} ${RECHero ? styles.RECHero : ''}`}>
      {children}
    </div>
  )
}

export default SectionContent
