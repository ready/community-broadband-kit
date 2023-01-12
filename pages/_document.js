import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render () {
    return (
      <Html>
        <Head>
          {/* <meta charSet="utf-8" /> */}
          {/* <meta content="Fast-apply for IIJA broadband funding in as little as 30 minutes. Find private match capital, track application status, and more. Free for local ISPs, RECs, and local gov." name="description" />
          <meta content="Get your share of $75 billion+ in federal, state, and local broadband grants" property="og:title" />
          <meta content="Fast-apply for IIJA broadband funding in as little as 30 minutes. Find private match capital, track application status, and more. Free for local ISPs, RECs, and local gov." property="og:description" />
          <meta content="https://uploads-ssl.webflow.com/6137979dcb63d03f4df0baef/613a02565bcfaf82e16c52bc_local%20isp%20gov%20iija%20broadband%20bridge%20act%20portal.jpg" property="og:image" />
          <meta content="Get your share of $75 billion+ in federal, state, and local broadband grants" property="twitter:title" />
          <meta content="Fast-apply for IIJA broadband funding in as little as 30 minutes. Find private match capital, track application status, and more. Free for local ISPs, RECs, and local gov." property="twitter:description" />
          <meta content="https://uploads-ssl.webflow.com/6137979dcb63d03f4df0baef/613a02565bcfaf82e16c52bc_local%20isp%20gov%20iija%20broadband%20bridge%20act%20portal.jpg" property="twitter:image" />
          <meta property="og:type" content="website" />
          <meta content="summary_large_image" name="twitter:card" />
          <meta content="JskpwIx1mVNHU1fPRvl0fObDpJOhkZyntEgt5g_7M4c" name="google-site-verification" /> */}
          {/* Icons */}
          <link href='/favicon.ico' rel='shortcut icon' type='image/x-icon' />
          <link href='/favicon.ico' rel='apple-touch-icon' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
