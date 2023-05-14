import styles from './SectionContent.module.css'

const SectionRight = ({ children, className }) => {
  return (
    <div className={`${styles.sectionRight} ${className || className}`}>
      {children}
    </div>
  )
}

export default SectionRight
