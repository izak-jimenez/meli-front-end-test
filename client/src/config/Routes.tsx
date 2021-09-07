/**
 * Routes configuration
 * Route configuration for the application
 * Contains the paths and associated components for each defined route
 */

import { Route, Switch } from 'react-router-dom'
import Home from '../pages/Home'
import SearchResults from '../pages/SearchResults'
import ItemDetails from '../pages/ItemDetails'
import { routePaths } from './constants'

const Routes = () => {
  const { home, items, itemDetails } = routePaths
  return (
    <Switch>
      <Route exact path={home} component={Home} />
      <Route exact path={items} component={SearchResults} />
      <Route exact path={itemDetails} children={ItemDetails} />
    </Switch>
  )
}

export default Routes
