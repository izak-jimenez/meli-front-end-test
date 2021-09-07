/**
 * http service
 * Implements HTTP GET functionality via the axios library
 */

import axios from 'axios'
import { baseUrl } from '../../config/constants'

axios.defaults.baseURL = baseUrl

/**
 * Wrapper for the axios GET service
 * @param {string} url
 * @return {AxiosResponse} response
 */
export const get = async (url: string): Promise<any> => {
  try {
    const response = await axios.get(url)
    return response
  } catch (error) {
      console.log('error: ', error)
    return -1
  }
}