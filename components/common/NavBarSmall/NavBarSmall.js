import React from 'react'
import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

import Link from '../Link/Link'
import Logo from '../Logo/Logo'
import styles from './NavBarSmall.module.css'

const NavBarSmall = ({ toggleMenu, collapsed }) => {
  return (
    <div className={styles.container} style={{ left: !collapsed ? 0 : '200%' }}>
      <nav className={styles.nav}>
        <div className={styles.header}>
          <Logo color='black' className={styles.logo} />
          <Button
            onClick={toggleMenu}
            style={{
              marginLeft: '24px',
              border: 'none',
              boxShadow: 'none'
            }}
            shape='circle'
            size='large'
            ghost
            icon={
              <CloseOutlined style={{
                fontSize: 'var(--font-size-icon)',
                color: 'var(--color-blue-9)'
              }}
              />
}
          />

        </div>
        <div className={styles.navItem}>
          {/* <Link href='/navbar' text='Learn More' className={styles.navLink} /> */}
          <Link href='/investors' text='Investors' className={styles.navLink} />
        </div>
      </nav>
    </div>
  )
}

export default NavBarSmall
