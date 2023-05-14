import React from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'

const Layout = ({ children, logoColor, hero, page, title, mapHeader }) => {
  return (
    <>
      <Header logoColor={logoColor} hero={hero} page={page} title={title} mapHeader={mapHeader} />
      {children}
      <Footer />
    </>
  )
}

export default Layout

