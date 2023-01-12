import React from 'react'

import styles from './Title.module.css'

const Title = ({ children, className, page, ...props }) => {
  const [classes, setClasses] = React.useState(styles.title)

  React.useEffect(() => {
    setClasses(`${styles.title} ${className || ''}`)
  }, [])

  return (
    <div className={classes} {...props}>
      {page === 'howItWorks'
        ? <h2>{children}</h2>
        : <h1>{children}</h1>}
    </div>
  )
}

export default Title
