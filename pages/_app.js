import React from 'react'
import 'antd/dist/antd.css'
import '../styles/globals.css'
import Head from 'next/head'
import Script from 'next/script'
import App from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from '/utils/apollo-client'
import { ScrollContextProvider } from '/components/context/ScrollContext'
import { CommunityContextProvider } from '/components/context/CommunityContext'
import TranslateProvider from '/components/context/TranslateProvider'
import { DEFAULT_HOST, GRAPHQL_API_URL } from '/utils/constants'

function MyApp ({ Component, pageProps }) {
  const config = pageProps?.config
  const colors = config?.themeColor?.map((color) => '#' + color)

  return (
    <TranslateProvider>
      <ApolloProvider client={client}>
        <ScrollContextProvider>
          <CommunityContextProvider config={config}>
            <>
              <Head>
                <meta
                  content='width=device-width, initial-scale=1'
                  name='viewport'
                />
                <link href='/favicon.ico' rel='shortcut icon' type='image/x-icon' />
                <link href='/favicon.ico' rel='apple-touch-icon' />
              </Head>
              {/* Google Analytics */}
              <Script
                id='gtag'
                async=''
                src='https://www.googletagmanager.com/gtag/js?id=G-V6PD0S9CGS'
              />
              <Component {...pageProps} />
              <style jsx global>
                {`
                  :root {
                    --color-heading: ${colors[1]};
                    --color-subheading: ${colors[2]};
                    --color-text: ${colors[3]};
                    --color-button: ${colors[4]};
                    --color-button-hover: ${colors[5]};
                    --color-background1: ${colors[6]};
                    --color-background2: ${colors[7]};
                    --color-background3: ${colors[8]};
                    --color-footer: ${colors[9]};
                    --color-nav-text: ${colors[10]};
                    --color-accent: ${colors[11]};
                    --color-light-accent: ${colors[12]};
                  }
                // `}
              </style>
            </>
          </CommunityContextProvider>
        </ScrollContextProvider>
      </ApolloProvider>
    </TranslateProvider>

  )
  // }
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  const req = appContext?.ctx?.req

  let host = req?.headers?.host
  let config = await getAssets(host)

  if (!config) {
    config = await getAssets(DEFAULT_HOST)
  }

  return {
    pageProps: {
      ...appProps.pageProps,
      config
    }
  }
}

async function getAssets(host) {
  let args

  if (host?.endsWith('.broadband.money')) {
    const subdomain = host.slice(0, host.lastIndexOf('.broadband.money'))

    args = `subdomainName: "${subdomain}"`
  } else {
      if (host?.startsWith('www.')) {
          host = host.replace('www.', '')
      }

      args = `domainName: "${host}"`
  }

  const body = JSON.stringify({
    query: `query {
        getCommunityApplicationsByDomain(${args}) {
            organization {
                id
            }
            communityName
            logo
            headerTitle
            headerDescription
            favicon
            buttonText
            heading
            description
            themeColor
            ogTitle
            ogImage
            ogDescription
            logoWidth
            domainName
            isAddressRequired
            showBbmReferences
            individualSurveyEnabled
            showHistory
            resultShareButtons
        }
    }`
  })

  return fetch(GRAPHQL_API_URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body
  })
  .then(res => res.json())
  .then (result => {
    return result.data.getCommunityApplicationsByDomain[0]
  })
  .catch(err => console.log(err))
}

export default MyApp