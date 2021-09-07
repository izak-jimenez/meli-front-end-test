import _ from 'lodash'
import { shallow, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'

import { SearchBar } from './lib/components'
import MeliApp from './MeliApp'
import { getItems, getItemDetails } from './lib/services'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

configure({ adapter: new Adapter() })

describe('MLA API Integration Test Suite', () => {
  console.log('Integration Test Suite for MLA API')
  it('Returns a properly formatted ItemsResponse object from the /items resource', async () => {
    expect.assertions(6)
    const data = await getItems('nintendo')
    expect(data.status).toBe(200)
    expect(data.data).toHaveProperty('author')
    expect(data.data).toHaveProperty('categories')
    expect(data.data).toHaveProperty('items')
    expect(_.isArray(data.data.categories)).toBe(true)
    expect(_.isArray(data.data.items)).toBe(true)
  })

  it('Returns properly formed items from the /items resource', async () => {
    const data = await getItems('lego')
    const items = data.data.items
    expect(data.status).toBe(200)
    expect(data.data).toHaveProperty('items')
    expect(items.length >= 0).toBe(true)
    items.map(
      (item: {
        id: string
        title: string
        price: {
          currency: string
          amount: number
          decimal: number
        }
        picture: string
        condition: string
        free_shipping: boolean
      }) => {
        expect(item).toHaveProperty('id')
        expect(item).toHaveProperty('title')
        expect(item).toHaveProperty('price')
        expect(item).toHaveProperty('picture')
        expect(item).toHaveProperty('condition')
        expect(item).toHaveProperty('free_shipping')
        expect(item.price).toHaveProperty('currency')
        expect(item.price).toHaveProperty('amount')
        expect(item.price).toHaveProperty('decimals')
      }
    )
  })

  it('Returns properly formatted ItemDetailsResponse from the /items/:id resource', async () => {
    const data = await getItemDetails('MLA935479471')
    const itemDetails = data.data
    expect(data.status).toBe(200)
    expect(itemDetails).toHaveProperty('author')
    expect(itemDetails).toHaveProperty('item')
    expect(itemDetails.item).toHaveProperty('id')
    expect(itemDetails.item).toHaveProperty('title')
    expect(itemDetails.item).toHaveProperty('price')
    expect(itemDetails.item.price).toHaveProperty('currency')
    expect(itemDetails.item.price).toHaveProperty('amount')
    expect(itemDetails.item.price).toHaveProperty('decimals')
    expect(itemDetails.item).toHaveProperty('picture')
    expect(itemDetails.item).toHaveProperty('condition')
    expect(itemDetails.item).toHaveProperty('free_shipping')
    expect(itemDetails.item).toHaveProperty('sold_quantity')
    expect(itemDetails.item).toHaveProperty('description')
  })
})

describe('Component Tests Suite', () => {
  console.log('Unit Tests Suite for MLA API')
  it('Should render text input field', () => {
    render(<SearchBar />)
    const searchBarInputElement = screen.getByTestId('search-input')
    expect(searchBarInputElement).toBeInTheDocument()
  })

  it('Should render the items view when passed a search query parameter', async () => {
    render(<MeliApp />)
    userEvent.type(screen.getByPlaceholderText('Nunca dejes de buscar'), 'amd')
    fireEvent(
      screen.getByTestId('search-button'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    )
    await waitFor(() => {
      expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument()
    })
  })
})
