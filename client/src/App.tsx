import './assets/css/reset.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import Routers from './Routers'

// Components Default
import { Layout } from './app/default/index'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>      
    <React.StrictMode>
        <Layout>          
          <Routers />
        </Layout>
    </React.StrictMode>
  </BrowserRouter>
)
