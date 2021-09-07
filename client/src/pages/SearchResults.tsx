/**
 * SearchResults component
 * Items Component parent
 * Main ewntry point for the /items route
 */

import { Items } from '../lib/components'
import { withMainLayout } from '../lib/components/layout'

const SearchResults = () => {
  return <Items />
}

export default withMainLayout(SearchResults)
