import Head from 'next/head'
import Footer from '../../sections/Footer/Footer'

export default function Layout ({
  title,
  keywords,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  page,
  children,
  config
}) {
  return (
    <div style={{ width: '100%' }}>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        {ogTitle
          ? (
            <meta property='og:title' content={ogTitle} />
            )
          : (
            <meta property='og:title' content={title} />
            )}
        {ogDescription
          ? (
            <meta property='og:description' content={ogDescription} />
            )
          : (
            <meta property='og:description' content={description} />
            )}
        {ogImage
          ? (
            <meta
              property='og:image'
              content={ogImage}
            />
            )
          : (
            <meta
              content='https://storage.googleapis.com/bbm-public-bucket/broadband_grants_og_image_91a9a40275.png'
              property='og:image'
            />
            )}
        {ogImage && <meta name='twitter:card' content='summary_large_image' />}
        {ogTitle
          ? (
            <meta property='twitter:title' content={ogTitle} />
            )
          : (
            <meta property='twitter:title' content={title} />
            )}
        {ogDescription
          ? (
            <meta property='twitter:description' content={ogDescription} />
            )
          : (
            <meta property='twitter:description' content={description} />
            )}
        {ogImage
          ? (
            <meta
              property='twitter:image'
              content={ogImage}
            />
            )
          : (
            <meta
              content='https://storage.googleapis.com/bbm-public-bucket/broadband_grants_og_image_91a9a40275.png'
              property='twitter:image'
            />
            )}
      </Head>
      {children}
      <div id="ookla-test" style={{ display: 'none' }}></div>
      {page === 'how it works' ? null : <Footer config={config}/>}
      <script src="/test/m-lab/ndt7.min.js" type="text/javascript"></script>
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCFSRcqE5mWaypizwTElZzYQA3x3IiCiaQ&libraries=places"></script>
    </div>
  )
}