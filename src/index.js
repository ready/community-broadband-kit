import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloProvider } from '@apollo/client'
import { ScrollContextProvider } from './components/common/Context/ScrollContext'
import { AppContextProvider } from './components/common/Context/AppContext'
import TranslateProvider from './components/common/Context/TranslateProvider'
import client from './utils/apollo-client'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <TranslateProvider>
      <ApolloProvider client={client}> 
        <ScrollContextProvider>
          <AppContextProvider>
            <App />
          </AppContextProvider>
        </ScrollContextProvider>
      </ApolloProvider>
    </TranslateProvider>
  </React.StrictMode>
)