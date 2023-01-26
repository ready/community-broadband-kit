import React from 'react'
import { Button } from 'antd'
import { MenuOutlined } from '@ant-design/icons'

const MenuIcon = ({ handleClick, size, shape }) => {
  return (
    <Button onClick={toggleMenu} type='primary' shape={shape} icon={<MenuOutlined />} size={size} />
  )
}

export default MenuIcon
