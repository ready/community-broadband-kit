import styles from './SectionContent.module.css'

const SectionLeft = ({ children, className, hero }) => {
  return (
    <div className={`${styles.sectionLeft} ${className || ''} ${hero ? styles.heroSectionLeft : ''}`}>
      {children}
    </div>
  )
}

export default SectionLeft
