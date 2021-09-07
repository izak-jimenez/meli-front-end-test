/**
 * Item type
 * Represents an ItemResponse object
 */

export type ItemsResponse = {
  author: {
    name: string
    lastname: string
  }
  categories: {id: string, name: string}[]
  items: {
    id: string
    title: string
    state_name: string
    price: {
      currency: string
      amount: number
      decimals: number
    }
    picture: string
    condition: string
    free_shipping: boolean
  }[]
}
