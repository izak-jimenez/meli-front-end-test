/**
 * Details component
 * Renders a component with the details of an item
 * Retrieves the item ID from the URL params to execute an API call to fetch the item details
 * @returns {JSXElement} Details
 */

import { useEffect, useState } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { Container, Grid, Typography, Breadcrumbs, Link, Button, CircularProgress } from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { FaTruck } from 'react-icons/fa'
import { useQueryParam, NumberParam, StringParam } from 'use-query-params'
import { useSearchContext } from './context'
import { routePaths, itemConditionLabels } from '../../config/constants'
import { ItemDetailsResponse } from '../types'
import { Divider, Spinner } from '../components/common'
import { getItemDetails } from '../services'
import '../../lib/styles/Main.scss'

const Details = (props: any) => {
  const { id } = useParams<{ id: string }>()

  const [itemDetails, setItemDetails] = useState<ItemDetailsResponse>()
  const [itemId, setItemId] = useState(id)

  const fetchItemDetails = async (itemId: string) => {
    const fetchedItemDetails = await getItemDetails(itemId)
    const data: ItemDetailsResponse = fetchedItemDetails?.data
    setItemDetails(data)
  }

  useEffect(() => {
    if (itemId) fetchItemDetails(itemId)
  }, [itemId])

  const renderImageSlider = (images: string[] | undefined) => {
    if (images) {
      return (
        <Carousel>
          {images.slice(0, 2).map((image) => {
            return <img key={image} src={image} className="carousel-img" />
          })}
        </Carousel>
      )
    } else {
      return null
    }
  }

  const renderItemImageAndPrice = (itemDetails: ItemDetailsResponse | undefined) => {
    const itemCondition = itemDetails?.item?.condition
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          {renderImageSlider(itemDetails?.item?.picture?.split(','))}
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Grid container>
            <Grid item xs={12}>
              {/* @ts-ignore */}
              <Typography>{`${itemConditionLabels[itemCondition]?.i18n?.es} - ${itemDetails?.item?.sold_quantity} vendidos`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className="item-details-title">{itemDetails?.item.title}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className="item-details-price">
                <span className="integers">$ {itemDetails?.item.price.amount.toLocaleString()}</span>
                <sup className="cents">{itemDetails?.item.price.decimals}</sup>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider height={50} />
              <Button fullWidth variant="contained" className="buy-button">
                Comprar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  const renderDescription = (itemDescription: string | undefined) => {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography gutterBottom className="product-description-title">
            Descripción del producto
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className="product-description">{itemDescription ?? 'Sin descripción'}</Typography>
        </Grid>
      </Grid>
    )
  }

  return (
    <Container>
      <Grid container>
        {itemDetails ? (
          <>
            <Grid item xs={12} className="breadcrumbs-container"></Grid>
            <Grid item xs={12} data-testid="item-details">
              {renderItemImageAndPrice(itemDetails)}
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <Divider height={50} />
              {renderDescription(itemDetails?.item.description)}
            </Grid>
          </>
        ) : (
          <Spinner />
        )}
      </Grid>
    </Container>
  )
}

export default Details
