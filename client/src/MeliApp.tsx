import './lib/styles/Main.scss'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import Routes from './config/Routes'

const MeliApp = () => {
  return (
    <div>
      <div>
        <Router>
          <QueryParamProvider ReactRouterRoute={Route}>
            <Routes />
          </QueryParamProvider>
        </Router>
      </div>
    </div>
  )
}

export default MeliApp
