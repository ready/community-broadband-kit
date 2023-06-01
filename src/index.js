import React from 'react'
import ReactDOM from 'react-dom/client'
import 'antd/dist/reset.css'
import './index.css';
import App from './App'
import { ApolloProvider } from '@apollo/client'
import { AppContextProvider } from './components/common/Context/AppContext'
import MapsProvider from './components/common/Context/MapsProvider'
import TranslateProvider from './components/common/Context/TranslateProvider'
import client from './utils/apollo-client'
import LocalTestingStyle from 'LocalTestingStyle'
import { SERVERLESS_TESTING_FLAG } from 'utils/constants'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    {SERVERLESS_TESTING_FLAG && <LocalTestingStyle />}
    <TranslateProvider>
      <MapsProvider>
        <ApolloProvider client={client}> 
          <AppContextProvider>
            <App />
          </AppContextProvider>
        </ApolloProvider>
      </MapsProvider>
    </TranslateProvider>
  </React.StrictMode>
)