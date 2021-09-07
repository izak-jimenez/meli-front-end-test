import { get } from './http'
import { itemDetailsEndpoint, itemsApiEndpoint } from '../../config/constants'

/**
 * Fetch items data from MLA API based on query parameter
 * API: MLA API
 * Resource: /items
 * @return {AxiosResponse} response
 */
export const getItems = async (searchParam: string): Promise<any> => {
  return await get(itemsApiEndpoint.replace('{query}', searchParam))
}

/**
 * Fetch item details from MLA API based on item ID
 * API: MLA API
 * Resource: /items/:id
 * @return {AxiosResponse} response
 */
export const getItemDetails = async (itemId: string): Promise<any> => {
  return await get(itemDetailsEndpoint.replace('{id}', itemId.toString()))
}
