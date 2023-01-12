import React from 'react'

import styles from './Description.module.css'

const Description = ({ children, className, ...props }) => {
  const [classes, setClasses] = React.useState(styles.description)

  React.useEffect(() => {
    setClasses(`${styles.description} ${className || ''}`)
  }, [])

  return (
    <div className={classes} {...props}>
      <p>{children}</p>
    </div>
  )
}

export default Description
