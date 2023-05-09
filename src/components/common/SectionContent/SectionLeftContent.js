import styles from './SectionContent.module.css'

const SectionLeft = ({ children, className, hero, RECHero }) => {
  return (
    <div className={`${styles.sectionLeft} ${className || ''} ${hero ? styles.heroSectionLeft : ''} ${RECHero ? styles.RECHeroSectionLeft : ''}`}>
      {children}
    </div>
  )
}

export default SectionLeft
