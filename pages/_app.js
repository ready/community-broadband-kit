import React from 'react'
import 'antd/dist/antd.css'
import '../styles/globals.css'
import Head from 'next/head'
import Script from 'next/script'
import { ApolloProvider } from '@apollo/client'
import { SessionProvider } from 'next-auth/react'
import client from '/utils/apollo-client'
import { ScrollContextProvider } from '/components/context/ScrollContext'
import { CommunityContextProvider } from '/components/context/CommunityContext'
import TranslateProvider from '/components/context/TranslateProvider'

function MyApp ({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <TranslateProvider>
      <SessionProvider session={session}>
        <ApolloProvider client={client}>
          <ScrollContextProvider>
            <CommunityContextProvider>
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
              </>
            </CommunityContextProvider>
          </ScrollContextProvider>
        </ApolloProvider>
      </SessionProvider>
    </TranslateProvider>

  )
  // }
}

export default MyApp
