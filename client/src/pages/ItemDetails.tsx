/**
 * ItemDetails component
 * Details Component parent
 * Main ewntry point for the /items/:id route
 */

import { Details } from '../lib/components'
import { withMainLayout } from '../lib/components/layout'

const ItemDetails = () => {
  return <Details />
}

export default withMainLayout(ItemDetails)
