import styles from './SectionContent.module.css'

const SectionRight = ({ children, className, RECHero }) => {
  return (
    <div className={`${styles.sectionRight} ${className || className} ${RECHero ? styles.RECHeroSectionRight : ''}`}>
      {children}
    </div>
  )
}

export default SectionRight
