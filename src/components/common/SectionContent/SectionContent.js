import styles from './SectionContent.module.css'

const SectionContent = ({ children, hero }) => {
  return (
    <div className={`${styles.section} ${hero ? styles.heroSection : ''}`}>
      {children}
    </div>
  )
}

export default SectionContent
