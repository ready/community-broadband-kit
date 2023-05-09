import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloProvider } from '@apollo/client'
import { ScrollContextProvider } from './components/context/ScrollContext'
import { CommunityContextProvider } from './components/context/CommunityContext'
import TranslateProvider from './components/context/TranslateProvider'
import client from './utils/apollo-client'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <TranslateProvider>
      <ApolloProvider client={client}> 
        <ScrollContextProvider>
          <CommunityContextProvider>
            <App />
          </CommunityContextProvider>
        </ScrollContextProvider>
      </ApolloProvider>
    </TranslateProvider>
  </React.StrictMode>
)