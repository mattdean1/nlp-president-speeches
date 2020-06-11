import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { StylesProvider } from '@material-ui/core/styles'

import { DataProvider } from './store/context'
import Dashboard from './pages/Dashboard'
import Data from './pages/Data'
import Speech from './pages/Speech'

const App = () => {
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Helmet>
      <StylesProvider injectFirst>
        <DataProvider>
          <Router>
            <Switch>
              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route path="/data">
                <Data />
              </Route>
              <Route path="/speech">
                <Speech />
              </Route>
            </Switch>
          </Router>
        </DataProvider>
      </StylesProvider>
    </>
  )
}

export default App
