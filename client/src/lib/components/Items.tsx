/**
 * Items component
 * Renders a component with the list of clickable retrieved items based on the search query parameter
 * @returns {JSXElement} Items
 */

import { useEffect, useState } from 'react'
import { Container, Grid, Divider, Typography, Breadcrumbs, Link } from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { useHistory } from 'react-router-dom'
import { FaTruck } from 'react-icons/fa'
import { useQueryParam, StringParam } from 'use-query-params'
import { routePaths } from '../../config/constants'
import { ItemsResponse } from '../types'
import { NoItems, Spinner } from './common'
import { getItems } from '../services'
import '../../lib/styles/Main.scss'

const Items = (props: any) => {
  const history = useHistory()
  const [searchParameter, setSearchParameter] = useQueryParam('search', StringParam)
  const [result, setResult] = useState<ItemsResponse>()
  const [noResults, setNoResults] = useState(false)

  const fetchItems = async (param: string) => {
    const fetchedItems = await getItems(param)
    const data: ItemsResponse = fetchedItems?.data
    setResult(data)
    if (fetchedItems === -1) {
      setNoResults(true)
    } else {
      setNoResults(false)
    }
  }

  useEffect(() => {
    if (searchParameter) fetchItems(searchParameter)
  }, [searchParameter])

  const handleItemClick = (itemId: string): React.MouseEventHandler<HTMLDivElement> | undefined => {
    history.push(routePaths.itemDetails.replace(':id', itemId))
    return undefined
  }

  const renderBreadCrumbs = (path: { id: string; name: string }[] | undefined) => {
    return (
      <div className="breadcrumbs">
        <Breadcrumbs data-testid="breadcrumbs" separator={<NavigateNextIcon fontSize="small" />}>
          {path?.map((level) => {
            const { id, name } = level
            return (
              <Link key={id} href="#">
                {name}
              </Link>
            )
          })}
        </Breadcrumbs>
      </div>
    )
  }

  const renderNoItemsBox = () => {
    return <NoItems />
  }

  const renderResults = (results: ItemsResponse | undefined) => {
    return (
      <div>
        {results?.items?.map((result) => {
          const {
            id,
            title,
            state_name,
            price: { currency, amount, decimals },
            picture,
            condition,
            free_shipping,
          } = result

          return results && results?.items?.length > 0 ? (
            <div key={id} className="item-row">
              <Grid container>
                <Grid item xs={3} sm={3} md={2} lg={2}>
                  <div className="item-thumbnail" onClick={() => handleItemClick(result.id)}>
                    <img src={picture} width="120" alt="thumbnail" />
                  </div>
                </Grid>
                <Grid item xs={8} sm={8} md={6} lg={6}>
                  <div>
                    <Grid container>
                      <Grid item xs={12}>
                        <div className="item-price">
                          <Typography>$ {amount.toLocaleString()}</Typography>
                          {free_shipping ? <FaTruck className="free-shipping-icon" /> : null}
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <div
                          data-testid={`item-title-${id}`}
                          className="item-title"
                          onClick={() => handleItemClick(result.id)}
                        >
                          <Typography>{title}</Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={1} sm={1} md={4} lg={4}>
                  <div className="item-state-name">
                    <Typography>{state_name}</Typography>
                  </div>
                </Grid>
              </Grid>
              <Divider />
            </div>
          ) : (
            <Spinner />
          )
        })}
      </div>
    )
  }

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} data-testid="breadcrumb-container" className="breadcrumbs-container">
          {renderBreadCrumbs(result?.categories)}
        </Grid>
        <Grid item xs={12}>
          {noResults ? (
            renderNoItemsBox()
          ) : result && result?.items?.length > 0 ? (
            renderResults(result)
          ) : (
            <Spinner />
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Items
