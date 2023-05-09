import styles from './HamburgerButton.module.css'

const HamburgerButton = ({ openMenu, setOpenMenu, page }) => {
  return (
    <div
      className={`${styles.menuButton} ${page === 'howItWorks' ? styles.darkmode : ''}`}
      onClick={() => setOpenMenu(!openMenu)}
    >
      <div
        className={styles.line}
        style={{ transform: openMenu ? 'rotate(45deg)' : 'rotate(0)' }}
      />
      <div
        className={styles.line}
        style={{ opacity: openMenu ? '0' : '1', transform: openMenu ? 'translateX(20px)' : 'translateX(0)' }}
      />
      <div
        className={styles.line}
        style={{ transform: openMenu ? 'rotate(-45deg)' : 'rotate(0)' }}
      />
    </div>
  )
}

export default HamburgerButton
